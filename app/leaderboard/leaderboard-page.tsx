"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, Download, Users, Trophy, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import Layout from "@/components/layout"

interface PlayerInfo {
    name: string
    realm: string
    slug: string
    level: number
    last_login_timestamp: number
    average_item_level: number
    equipped_item_level: number
    allow: boolean
    class: string
    spec: string
    race: string
    rating: number
    top_rating: number
}

interface Percentile {
    percentile: string
    rating: number
    keystoneLevel: number
    playerCount: number
    color: string
    icon: string
}

interface LeaderboardData {
    total_player: number
    avg_keystone_level: number
    players: PlayerInfo[]
    percentiles: Percentile[]
}

export default function LeaderboardPage() {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedClass, setSelectedClass] = useState("all")
    const [selectedSpec, setSelectedSpec] = useState("all")

    // 模拟API调用
    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                setLoading(true)
                setError(null)

                
                // Fetch player info
                const leaderBoardResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/api/leaderboard_v1`)
                if (!leaderBoardResponse.ok) {
                    throw new Error(`Failed to fetch player info: ${leaderBoardResponse.status}`)
                }
                const leaderBoardData = await leaderBoardResponse.json()
                setLeaderboardData(leaderBoardData)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load leaderboard data")
            } finally {
                setLoading(false)
            }
        }

        fetchLeaderboardData()
    }, [])

    // 获取所有可用的职业和专精
    const getAvailableClasses = () => {
        if (!leaderboardData?.players) return []
        const classes = new Set<string>()
        leaderboardData.players.forEach((player) => classes.add(player.class))
        return Array.from(classes)
    }

    const getAvailableSpecs = () => {
        if (!leaderboardData?.players) return []
        const specs = new Set<string>()
        leaderboardData.players.forEach((player) => {
            if (selectedClass === "all" || player.class === selectedClass) {
                specs.add(player.spec)
            }
        })
        return Array.from(specs)
    }

    // 过滤玩家列表
    const filteredPlayers = leaderboardData?.players.filter((player) => {
        const matchesSearch =
            player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.realm.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesClass = selectedClass === "all" || player.class === selectedClass
        const matchesSpec = selectedSpec === "all" || player.spec === selectedSpec
        return matchesSearch && matchesClass && matchesSpec
    })

    const getClassColor = (className: string) => {
        const classColors: { [key: string]: string } = {
            死亡骑士: "text-red-400",
            恶魔猎手: "text-purple-400",
            德鲁伊: "text-orange-400",
            唤魔师: "text-green-400",
            猎人: "text-green-400",
            法师: "text-blue-400",
            武僧: "text-green-400",
            圣骑士: "text-pink-400",
            牧师: "text-white",
            潜行者: "text-yellow-400",
            萨满祭司: "text-blue-400",
            术士: "text-purple-400",
            战士: "text-yellow-600",
        }
        return classColors[className] || "text-gray-400"
    }

    const getRatingColor = (rating: number) => {
        if (rating >= 3500) return "text-orange-400"
        if (rating >= 3000) return "text-purple-400"
        if (rating >= 2500) return "text-blue-400"
        if (rating >= 2000) return "text-green-400"
        return "text-gray-400"
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat("zh-CN").format(num)
    }

    return (
        <Layout>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">大秘境排行榜</h1>
                    <p className="text-gray-400 text-lg">查看国服评分排名</p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                            <p className="text-gray-300 text-lg">加载排行榜数据...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-400 text-lg mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
                            重试
                        </Button>
                    </div>
                )}

                {/* Leaderboard Content */}
                {!loading && !error && leaderboardData && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
                         {/*    <Card className="bg-gray-800 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">总玩家数</p>
                                            <p className="text-3xl font-bold text-white">{formatNumber(leaderboardData.total_player)}</p>
                                        </div>
                                        <div className="bg-gray-700 p-3 rounded-full">
                                            <Users className="h-6 w-6 text-purple-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-800 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">平均钥石等级</p>
                                            <p className="text-3xl font-bold text-white">
                                                {leaderboardData.avg_keystone_level > 0 ? leaderboardData.avg_keystone_level.toFixed(1) : "N/A"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-700 p-3 rounded-full">
                                            <Trophy className="h-6 w-6 text-yellow-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card> */}

                            <Card className="bg-gray-800 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">最高评分</p>
                                            <p className="text-3xl font-bold text-orange-400">
                                                {leaderboardData.players[0]?.rating.toFixed(0) || "N/A"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-700 p-3 rounded-full">
                                            <Trophy className="h-6 w-6 text-orange-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Percentiles */}
                        <Card className="bg-gray-800 border-gray-700 mb-8">
                            <CardHeader>
                                <CardTitle className="text-xl text-white">评分百分位</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {leaderboardData.percentiles.map((percentile, index) => (
                                        <div key={index} className="bg-gray-700 rounded-lg p-4 text-center relative overflow-hidden">
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-r opacity-20`}
                                                style={{ height: "100%" }}
                                            ></div>
                                            <p className="text-white font-bold text-lg relative z-10">{percentile.percentile}</p>
                                            <p className={` ${percentile.color} text-2xl font-bold relative z-10`}>{percentile.rating.toFixed(0)}</p>
                                            <p className="text-gray-400 text-sm relative z-10">评分</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Players Table */}
                        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                排名
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                玩家
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                服务器
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                职业/专精
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                装等
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                评分
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                最后登录
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {filteredPlayers?.map((player, index) => (
                                            <tr key={`${player.name}-${player.realm}`} className="hover:bg-gray-750 transition-colors">
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {index < 3 ? (
                                                            <div
                                                                className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-yellow-700"
                                                                    }`}
                                                            >
                                                                {index + 1}
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400 font-medium w-6 text-center mr-2">{index + 1}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <Link href={`/player?realm=${player.slug}&name=${player.name}`}>
                                                        <span className={`font-medium ${getClassColor(player.class)}`}>{player.name}</span>
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-gray-300">{player.realm}</td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className={`${getClassColor(player.class)}`}>{player.class}</span>
                                                        <span className="text-gray-400 mx-1">-</span>
                                                        <span className="text-gray-300">{player.spec}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-gray-300">{player.equipped_item_level}</td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <span className={`font-bold ${getRatingColor(player.rating)}`}>
                                                        {player.rating.toFixed(0)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                                                    {formatDate(player.last_login_timestamp)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* No Results */}
                        {filteredPlayers?.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-400 text-lg">没有找到符合条件的玩家。</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </Layout>
    )
}
