"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Download, Users, Search, Star } from "lucide-react"
import Link from "next/link"
import Layout from "@/components/layout"
import { secondToString } from "@/utils/stampTransform"

interface Dungeon {
    name: string
    upgrade: number[]
    description: string
    assets: string
    is_tracked: boolean
}

export default function DungeonsPage() {
    const [dungeons, setDungeons] = useState<Dungeon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedSeason, setSelectedSeason] = useState("all")

    // Simulate API call
    useEffect(() => {
        const fetchDungeons = async () => {
            try {
                setLoading(true)
                // Simulate API delay
                // await new Promise((resolve) => setTimeout(resolve, 1500))

                const dungeonResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/api/dungeon`)
                if (!dungeonResponse.ok) {
                    throw new Error(`Failed to fetch player info: ${dungeonResponse.status}`)
                }
                const leaderBoardData = await dungeonResponse.json()
                setDungeons(leaderBoardData)
                setError(null)
            } catch (err) {
                setError("Failed to load dungeons. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchDungeons()
    }, [])

    // Filter dungeons based on search and filters
    const filteredDungeons = dungeons.filter((dungeon) => {
        const matchesSearch =
            dungeon.name.toLowerCase().includes(searchTerm.toLowerCase())

        // const matchesExpansion = selectedExpansion === "all" || dungeon.expansion === selectedExpansion
        // const matchesDifficulty = selectedDifficulty === "all" || dungeon.difficulty.includes(selectedDifficulty)
        const matchesSeason =
            selectedSeason === "all" ||
            (selectedSeason === "current" && dungeon.is_tracked) ||
            (selectedSeason === "non-current" && !dungeon.is_tracked)

        return matchesSearch && /* matchesExpansion && matchesDifficulty && */ matchesSeason
    })

    return (
        <Layout>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 ">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">大秘境列表</h1>
                    <p className="text-gray-400 text-lg">所有包含大秘境限时时间的地下城</p>
                </div>

                {/* Filters */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="地下城名称"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-gray-800 border-gray-700 text-white"
                        />
                    </div>

                    <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                        <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Season" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="all">全部</SelectItem>
                            <SelectItem value="current">当前赛季</SelectItem>
                            <SelectItem value="non-current">非赛季</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                            <p className="text-gray-300 text-lg">加载地下城列表中...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-400 text-lg mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
                            Retry
                        </Button>
                    </div>
                )}

                {/* Dungeons Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDungeons.map((dungeon) => (
                            <Card key={dungeon.name} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                                <CardHeader className="pb-3">
                                    <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden">
                                        <img
                                            src={dungeon.assets || "/placeholder.svg"}
                                            alt={dungeon.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-white text-lg">{dungeon.name}</CardTitle>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {dungeon.is_tracked ? (
                                                <Badge className="bg-green-600 text-white">当前赛季</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                                    非赛季
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-gray-300 text-sm">{dungeon.description}</p>

                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                        {dungeon.upgrade.map((upgrade, index) => {
                                            // 定义每个升级的样式
                                            const badgeColors = [
                                                "text-green-400",   // +1
                                                "text-yellow-400",  // +2
                                                "text-orange-400"   // +3
                                            ]
                                            const labelColors = [
                                                "text-green-200",
                                                "text-yellow-200",
                                                "text-orange-200"
                                            ]
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex flex-col items-center p-3 rounded-lg bg-gray-700"
                                                >
                                                    <span
                                                        className={`font-extrabold text-lg mb-1 ${badgeColors[index]}`}
                                                        style={{ letterSpacing: "1px" }}
                                                    >
                                                        +{index + 1}
                                                    </span>
                                                    <span
                                                        className={`font-extrabold text-lg drop-shadow-md ${labelColors[index]}`}
                                                        style={{ letterSpacing: "1px" }}
                                                    >
                                                        {secondToString(upgrade)}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && !error && filteredDungeons.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">你要找的地下城走丢了...</p>
                    </div>
                )}
            </main>
        </Layout>
    )
}
