"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Layout from "@/components/layout"
// import Layout from "./components/layout"



export default function Component() {
    const [playerName, setPlayerName] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const handleInspect = () => {
        if (playerName.trim()) {
            // 解析玩家名-服务器名格式
            const parts = playerName.trim().split("-")
            if (parts.length >= 2) {
                const name = parts[0]
                const realm = parts.slice(1).join("-") // 处理服务器名中可能包含连字符的情况

                // 重定向到搜索结果页面
                window.location.href = `/player?realm=${encodeURIComponent(realm)}&name=${encodeURIComponent(name)}`
            } else {
                alert("请输入正确的格式：玩家名-服务器名")
            }
        }
    }

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-[60vh]">
                {isAnalyzing ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                        <p className="text-gray-300 text-lg">搜索中...可能会花费一些时间...</p>
                    </div>
                ) : (
                    <div className="text-center max-w-2xl">
                        <h1 className="text-4xl font-bold mb-6">{"mythicstone.plus"}</h1>
                        <p className="text-gray-400 text-lg mb-8">{"输入'玩家-服务器'即可查询玩家大秘境记录"}</p>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center font-extralight font-mono">
                            <Input
                                placeholder="输入玩家名-服务器名"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                className="w-80 bg-gray-800 border-gray-700 placeholder:text-gray-400 text-center"
                                onKeyPress={(e) => e.key === "Enter" && handleInspect()}
                            />

                            <Button
                                onClick={handleInspect}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                                disabled={!playerName.trim()}
                            >
                                搜索玩家
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}