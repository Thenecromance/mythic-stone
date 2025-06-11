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
                // 模拟API延迟
                await new Promise((resolve) => setTimeout(resolve, 1000))

                /*         // 使用提供的数据
                        const mockData: LeaderboardData = {
                            total_player: 1154942,
                            avg_keystone_level: 0,
                            players: [
                                {
                                    name: "Annieguu",
                                    realm: "风暴之鳞",
                                    slug: "stormscale",
                                    level: 80,
                                    last_login_timestamp: 1748538710000,
                                    average_item_level: 683,
                                    equipped_item_level: 682,
                                    allow: true,
                                    class: "德鲁伊",
                                    spec: "平衡",
                                    race: "暗夜精灵",
                                    rating: 3945.7688,
                                    top_rating: 3945.7688,
                                },
                                {
                                    name: "Anuored",
                                    realm: "影之哀伤",
                                    slug: "shadowmourne",
                                    level: 80,
                                    last_login_timestamp: 1748565749000,
                                    average_item_level: 683,
                                    equipped_item_level: 682,
                                    allow: true,
                                    class: "恶魔猎手",
                                    spec: "复仇",
                                    race: "暗夜精灵",
                                    rating: 3940.6587,
                                    top_rating: 3940.6587,
                                },
                                {
                                    name: "Xmd",
                                    realm: "白银之手",
                                    slug: "silver-hand",
                                    level: 80,
                                    last_login_timestamp: 1748542350000,
                                    average_item_level: 683,
                                    equipped_item_level: 682,
                                    allow: true,
                                    class: "死亡骑士",
                                    spec: "冰霜",
                                    race: "人类",
                                    rating: 3930.4478,
                                    top_rating: 3930.4478,
                                },
                                {
                                    name: "Raré",
                                    realm: "布兰卡德",
                                    slug: "blanchard",
                                    level: 80,
                                    last_login_timestamp: 1748456876000,
                                    average_item_level: 683,
                                    equipped_item_level: 683,
                                    allow: true,
                                    class: "恶魔猎手",
                                    spec: "复仇",
                                    race: "暗夜精灵",
                                    rating: 3927.44,
                                    top_rating: 3927.44,
                                },
                                {
                                    name: "又是咚天",
                                    realm: "燃烧之刃",
                                    slug: "burning-blade",
                                    level: 80,
                                    last_login_timestamp: 1748407211000,
                                    average_item_level: 683,
                                    equipped_item_level: 683,
                                    allow: true,
                                    class: "牧师",
                                    spec: "戒律",
                                    race: "暗夜精灵",
                                    rating: 3927.25,
                                    top_rating: 3927.25,
                                },
                                {
                                    name: "Tchandd",
                                    realm: "燃烧之刃",
                                    slug: "burning-blade",
                                    level: 80,
                                    last_login_timestamp: 1748539294000,
                                    average_item_level: 683,
                                    equipped_item_level: 682,
                                    allow: true,
                                    class: "德鲁伊",
                                    spec: "平衡",
                                    race: "暗夜精灵",
                                    rating: 3924.74,
                                    top_rating: 3924.74,
                                },
                                {
                                    name: "Jeannelin",
                                    realm: "燃烧之刃",
                                    slug: "burning-blade",
                                    level: 80,
                                    last_login_timestamp: 1748532819000,
                                    average_item_level: 682,
                                    equipped_item_level: 682,
                                    allow: true,
                                    class: "德鲁伊",
                                    spec: "平衡",
                                    race: "暗夜精灵",
                                    rating: 3924.234,
                                    top_rating: 3924.234,
                                },
                                {
                                    name: "小红爪萱萱",
                                    realm: "熊猫酒仙",
                                    slug: "pandaren",
                                    level: 80,
                                    last_login_timestamp: 1748506280000,
                                    average_item_level: 683,
                                    equipped_item_level: 683,
                                    allow: true,
                                    class: "法师",
                                    spec: "奥术",
                                    race: "矮人",
                                    rating: 3923.08,
                                    top_rating: 3923.08,
                                },
                                {
                                    name: "Milkmage",
                                    realm: "血色十字军",
                                    slug: "scarlet-crusade",
                                    level: 80,
                                    last_login_timestamp: 1748448479000,
                                    average_item_level: 683,
                                    equipped_item_level: 680,
                                    allow: true,
                                    class: "法师",
                                    spec: "奥术",
                                    race: "矮人",
                                    rating: 3922.6,
                                    top_rating: 3922.6,
                                },
                                {
                                    name: "凯旋之咩",
                                    realm: "格瑞姆巴托",
                                    slug: "grim-batol",
                                    level: 80,
                                    last_login_timestamp: 1748512207000,
                                    average_item_level: 683,
                                    equipped_item_level: 683,
                                    allow: true,
                                    class: "牧师",
                                    spec: "戒律",
                                    race: "虚空精灵",
                                    rating: 3922.5513,
                                    top_rating: 3922.5513,
                                },
                            ],
                            percentiles: [
                                {
                                    percentile: "前0.1%",
                                    rating: 3666.17,
                                    keystoneLevel: -1,
                                    playerCount: 0,
                                    color: "from-yellow-400 to-yellow-600",
                                    icon: "",
                                },
                                {
                                    percentile: "前1.0%",
                                    rating: 3428.33,
                                    keystoneLevel: -1,
                                    playerCount: 0,
                                    color: "from-yellow-400 to-yellow-600",
                                    icon: "",
                                },
                                {
                                    percentile: "前25.0%",
                                    rating: 2961.09,
                                    keystoneLevel: -1,
                                    playerCount: 0,
                                    color: "from-yellow-400 to-yellow-600",
                                    icon: "",
                                },
                                {
                                    percentile: "前50.0%",
                                    rating: 2587.59,
                                    keystoneLevel: -1,
                                    playerCount: 0,
                                    color: "from-yellow-400 to-yellow-600",
                                    icon: "",
                                },
                                {
                                    percentile: "前75.0%",
                                    rating: 1009.08,
                                    keystoneLevel: -1,
                                    playerCount: 0,
                                    color: "from-yellow-400 to-yellow-600",
                                    icon: "",
                                },
                            ],
                        }
        
                        setLeaderboardData(mockData) */

                // Fetch player info
                const leaderBoardResponse = await fetch(`http://localhost:8080/api/leaderboard`)
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card className="bg-gray-800 border-gray-700">
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
                            </Card>

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
                                <CardTitle className="text-xl">评分百分位</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {leaderboardData.percentiles.map((percentile, index) => (
                                        <div key={index} className="bg-gray-700 rounded-lg p-4 text-center relative overflow-hidden">
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-r ${percentile.color} opacity-20`}
                                                style={{ height: "100%" }}
                                            ></div>
                                            <p className="text-white font-bold text-lg relative z-10">{percentile.percentile}</p>
                                            <p className="text-yellow-400 text-2xl font-bold relative z-10">{percentile.rating.toFixed(0)}</p>
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
                                                    <Link href={`/search?realm=${player.slug}&name=${player.name}`}>
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
