"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Download, Users, Clock, Trophy, Star, CheckCircle, XCircle, Calendar, Zap } from "lucide-react"
import Link from "next/link"
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

interface Affix {
    name: string
    description: string
    asset: string
}

interface DungeonRun {
    name: string
    finish: boolean
    duration: number
    level: number
    complete_time_stamp: number
    rating: number
    affixes: Affix[]
}

export default function SearchResultsPage() {
    const searchParams = useSearchParams()
    const realm = searchParams.get("realm") || ""
    const playerName = searchParams.get("name") || ""

    const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null)
    const [dungeonRuns, setDungeonRuns] = useState<DungeonRun[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPlayerData = async () => {
            if (!realm || !playerName) {
                setError("Missing realm or player name")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)

                const mockPlayer: PlayerInfo = {
                    "name": "黑色卷卷毛",
                    "realm": "布兰卡德",
                    "slug": "blanchard",
                    "level": 80,
                    "last_login_timestamp": 1749185930000,
                    "average_item_level": 667,
                    "equipped_item_level": 667,
                    "allow": true,
                    "class": "潜行者",
                    "spec": "奇袭",
                    "race": "玛格汉兽人",
                    "rating": 2218.608,
                    "top_rating": 3012.8582
                }
                const mockDungeonsRun: DungeonRun[] = [
                    {
                        "name": "暴富矿区！！",
                        "finish": true,
                        "duration": 1874491,
                        "level": 12,
                        "complete_time_stamp": 1748071469000,
                        "rating": 366.9983,
                        "affixes": [
                            {
                                "name": "强韧",
                                "description": "非首领敌人的生命值提高20%，造成的伤害最多提高20%。",
                                "asset": "https://render.worldofwarcraft.com/tw/icons/56/ability_toughness.jpg"
                            },
                            {
                                "name": "残暴",
                                "description": "首领的生命值提高25%，首领及其爪牙造成的伤害最多提高15%。",
                                "asset": "https://render.worldofwarcraft.com/tw/icons/56/achievement_boss_archaedas.jpg"
                            },
                            {
                                "name": "萨拉塔斯的狡诈",
                                "description": "萨拉塔斯背叛了玩家，撤销了自己的交易，而且每次角色死亡都会让剩余时间减少15秒。",
                                "asset": "https://render.worldofwarcraft.com/tw/icons/56/ability_racial_chillofnight.jpg"
                            }
                        ]
                    },

                ]


                setPlayerInfo(mockPlayer)
                setDungeonRuns(mockDungeonsRun)
                return
                // Fetch player info
                const playerResponse = await fetch(`http://localhost:8080/api/${realm}/${playerName}`)
                if (!playerResponse.ok) {
                    throw new Error(`Failed to fetch player info: ${playerResponse.status}`)
                }
                const playerData = await playerResponse.json()
                setPlayerInfo(playerData)

                // Fetch dungeon runs
                const dungeonResponse = await fetch(`http://localhost:8080/api/${realm}/${playerName}/dungeons`)
                if (!dungeonResponse.ok) {
                    throw new Error(`Failed to fetch dungeon data: ${dungeonResponse.status}`)
                }
                const dungeonData = await dungeonResponse.json()
                setDungeonRuns(dungeonData)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load player data")
            } finally {
                setLoading(false)
            }
        }

        fetchPlayerData()
    }, [realm, playerName])

    const formatDuration = (milliseconds: number) => {
        const minutes = Math.floor(milliseconds / 60000)
        const seconds = Math.floor((milliseconds % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

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
        if (rating >= 3000) return "text-orange-400"
        if (rating >= 2500) return "text-purple-400"
        if (rating >= 2000) return "text-blue-400"
        if (rating >= 1500) return "text-green-400"
        return "text-gray-400"
    }

    return (
        <Layout>
            <div className="pt-20">
                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                                <p className="text-gray-300 text-lg">Loading player data...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-12">
                            <p className="text-red-400 text-lg mb-4">{error}</p>
                            <Link href="/">
                                <Button className="bg-purple-600 hover:bg-purple-700">Back to Search</Button>
                            </Link>
                        </div>
                    )}

                    {/* Player Info */}
                    {!loading && !error && playerInfo && (
                        <>
                            <div className="mb-8">
                                <Card className="bg-gray-800 border-gray-700">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-2xl text-white mb-2">
                                                    <span className={getClassColor(playerInfo.class)}>{playerInfo.name}</span>
                                                    <span className="text-gray-400 text-lg ml-2">- {playerInfo.realm}</span>
                                                </CardTitle>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <span className="text-gray-300">等级 {playerInfo.level}</span>
                                                    <span className={getClassColor(playerInfo.class)}>
                                                        {playerInfo.spec} {playerInfo.class}
                                                    </span>
                                                    <span className="text-gray-400">{playerInfo.race}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Trophy className="h-5 w-5 text-yellow-400" />
                                                    <span className={`text-xl font-bold ${getRatingColor(playerInfo.rating)}`}>
                                                        {Math.round(playerInfo.rating)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-400">最高: {Math.round(playerInfo.top_rating)}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                                                <p className="text-gray-400 text-sm">平均装等</p>
                                                <p className="text-white text-lg font-semibold">{playerInfo.average_item_level}</p>
                                            </div>
                                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                                                <p className="text-gray-400 text-sm">已装备装等</p>
                                                <p className="text-white text-lg font-semibold">{playerInfo.equipped_item_level}</p>
                                            </div>
                                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                                                <p className="text-gray-400 text-sm">最后登录</p>
                                                <p className="text-white text-sm">{formatDate(playerInfo.last_login_timestamp)}</p>
                                            </div>
                                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                                                <p className="text-gray-400 text-sm">状态</p>
                                                <p className={`text-sm font-semibold ${playerInfo.allow ? "text-green-400" : "text-red-400"}`}>
                                                    {playerInfo.allow ? "公开" : "私密"}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Dungeon Runs */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6">地下城记录</h2>

                                {dungeonRuns.length === 0 ? (
                                    <Card className="bg-gray-800 border-gray-700">
                                        <CardContent className="text-center py-12">
                                            <p className="text-gray-400">暂无地下城记录</p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="space-y-4">
                                        {dungeonRuns.map((run, index) => (
                                            <Card key={index} className="bg-gray-800 border-gray-700">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="text-lg font-semibold text-white">{run.name}</h3>
                                                            <Badge className={`${run.finish ? "bg-green-600" : "bg-red-600"} text-white`}>
                                                                {run.finish ? (
                                                                    <>
                                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                                        完成
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <XCircle className="h-3 w-3 mr-1" />
                                                                        未完成
                                                                    </>
                                                                )}
                                                            </Badge>
                                                            <Badge variant="outline" className="text-orange-400 border-orange-400">
                                                                +{run.level}
                                                            </Badge>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <Star className="h-4 w-4 text-yellow-400" />
                                                                <span className="text-white font-semibold">{Math.round(run.rating)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                                <Calendar className="h-3 w-3" />
                                                                {formatDate(run.complete_time_stamp)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="flex items-center gap-2 text-gray-300">
                                                            <Clock className="h-4 w-4" />
                                                            <span>{formatDuration(run.duration)}</span>
                                                        </div>
                                                    </div>

                                                    {/* Affixes */}
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                                                            <Zap className="h-4 w-4" />
                                                            词缀
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                            {run.affixes.map((affix, affixIndex) => (
                                                                <div key={affixIndex} className="bg-gray-700 rounded-lg p-3">
                                                                    <div className="flex items-center gap-3 mb-2">
                                                                        <img
                                                                            src={affix.asset || "/placeholder.svg"}
                                                                            alt={affix.name}
                                                                            className="w-8 h-8 rounded"
                                                                        />
                                                                        <span className="text-white font-medium">{affix.name}</span>
                                                                    </div>
                                                                    <p className="text-gray-400 text-xs">{affix.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </Layout>
    )
}
