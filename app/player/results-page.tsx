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

/* interface PeriodRun {
    period: number
    dungeon_id: number
    finish: boolean
    complete_time_stamp: number
    level: number
    duration: number
    rating: number

}
 */
export default function SearchResultsPage() {
    const searchParams = useSearchParams()
    const realm = searchParams.get("realm") || ""
    const playerName = searchParams.get("name") || ""

    const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null)
    const [dungeonRuns, setDungeonRuns] = useState<DungeonRun[]>([])
    const [periodRuns, setPeriodRuns] = useState<DungeonRun[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<"week" | "all">("week")

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

                // Fetch player info
                const playerResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/api/${realm}/${playerName}`)
                if (!playerResponse.ok) {
                    throw new Error(`Failed to fetch player info: ${playerResponse.status}`)
                }
                const playerData = await playerResponse.json()
                setPlayerInfo(playerData)

                if (playerData.allow === false) {
                    setError("该玩家未公开大秘境数据或该玩家不存在")
                    setLoading(false)
                    return 
                }
                // Fetch dungeon runs
                const dungeonResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/api/${realm}/${playerName}/dungeons`)
                if (!dungeonResponse.ok) {
                    throw new Error(`Failed to fetch dungeon data: ${dungeonResponse.status}`)
                }
                const dungeonData = await dungeonResponse.json()
                setDungeonRuns(dungeonData)

                const periodResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/api/${realm}/${playerName}/period`)
                if (!periodResponse.ok) {
                    throw new Error(`Failed to fetch dungeon data: ${periodResponse.status}`)
                }
                const periodData = await periodResponse.json()
                setPeriodRuns(periodData)
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

    // 计算本周一零点时间戳
    const getWeekStart = () => {
        const now = new Date()
        const day = now.getDay() || 7 // 周日为0，转为7
        now.setHours(0, 0, 0, 0)
        now.setDate(now.getDate() - day + 1)
        return now.getTime()
    }
    // const weekStart = getWeekStart()
    const thisWeekRuns = periodRuns
    const thisWeekCount = thisWeekRuns.length
    const thisWeekMaxLevel = thisWeekRuns.reduce((max, run) => Math.max(max, run.level), 0)
    // const thisWeekMaxRating = thisWeekRuns.reduce((max, run) => Math.max(max, run.rating), 0)

    const allMaxLevel = dungeonRuns.reduce((max, run) => Math.max(max, run.level), 0)
    const allMaxRating = dungeonRuns.reduce((max, run) => Math.max(max, run.rating), 0)

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
                                <p className="text-gray-300 text-lg">加载中...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-12">
                            <p className="text-red-400 text-lg mb-4">{error}</p>
                            <Link href="/search">
                                <Button className="bg-purple-600 hover:bg-purple-700">返回搜索</Button>
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
                                                    <span className={`text-xl font-bold ${getRatingColor(playerInfo.top_rating)}`}>
                                                        {Math.round(playerInfo.top_rating)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-400">最后登录时间：{formatDate(playerInfo.last_login_timestamp)} </p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                                                <p className="text-gray-400 text-base">当前评分</p>
                                                <p className={`text-xl font-semibold ${getRatingColor(playerInfo.rating)}`}>
                                                    {Math.round(playerInfo.rating)}
                                                </p>
                                            </div>
                                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                                                <p className={`text-gray-400 text-base`}>最高分</p>
                                                <p className={`text-xl ${getRatingColor(playerInfo.top_rating)}`}>{Math.round(playerInfo.top_rating)}</p>
                                            </div>

                                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                                                <p className="text-gray-400 text-base">平均装等</p>
                                                <p className="text-white text-xl font-semibold">{playerInfo.average_item_level}</p>
                                            </div>
                                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                                                <p className="text-gray-400 text-base">已装备装等</p>
                                                <p className="text-white text-xl font-semibold">{playerInfo.equipped_item_level}</p>
                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Dungeon Runs */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">
                                        {viewMode === "week" ? "本周最佳大秘境" : "本赛季最佳大秘境"}
                                    </h2>
                                    <div className="flex gap-2">
                                        <button
                                            className={`px-5 py-2 rounded-lg font-semibold transition
                                                ${viewMode === "week"
                                                    ? "bg-purple-600 text-white shadow border-2 border-purple-700"
                                                    : "bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700"}
                                            `}
                                            onClick={() => setViewMode("week")}
                                        >
                                            本周
                                        </button>
                                        <button
                                            className={`px-5 py-2 rounded-lg font-semibold transition
                                                ${viewMode === "all"
                                                    ? "bg-purple-600 text-white shadow border-2 border-purple-700"
                                                    : "bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700"}
                                            `}
                                            onClick={() => setViewMode("all")}
                                        >
                                            最高
                                        </button>
                                    </div>
                                </div>
                                {/* 统计栏 */}
                                {viewMode === "week" ? (
                                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                                            <p className="text-gray-400 text-base">本周完成次数</p>
                                            <p className="text-xl font-semibold text-white">{thisWeekCount}</p>
                                        </div>
                                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                                            <p className="text-gray-400 text-base">本周最高层数</p>
                                            <p className="text-xl font-semibold text-orange-400">{thisWeekMaxLevel}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                                            <p className="text-gray-400 text-base">最高层数</p>
                                            <p className="text-xl font-semibold text-orange-400">{allMaxLevel}</p>
                                        </div>
                                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                                            <p className="text-gray-400 text-base">单大秘境最高评分</p>
                                            <p className="text-xl font-semibold text-purple-400">{Math.round(allMaxRating)}</p>
                                        </div>
                                    </div>
                                )}

                                {/* dungeonRuns 列表 */}
                                {(viewMode === "week" ? thisWeekRuns : dungeonRuns).length === 0 ? (
                                    <Card className="bg-gray-800 border-gray-700">
                                        <CardContent className="text-center py-12">
                                            <p className="text-gray-400">暂无地下城记录</p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="space-y-4">
                                        {(viewMode === "week" ? thisWeekRuns : dungeonRuns).map((run, index) => (
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
                                                    {Array.isArray(run.affixes) && run.affixes.length > 0 && (
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
                                                    )}
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
