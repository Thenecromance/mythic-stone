"use client"

import Link from "next/link"

export default function Header() {
    return (
        
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 shadow-lg backdrop-blur-2xl transition-all">
            <div className="container flex h-16 items-center justify-between px-4">

                <Link className="flex items-center space-x-2 font-bold group" href="/">
                    <img
                        src="/logo.png"
                        alt="MythicStone Logo"
                        className="h-8 w-8 drop-shadow-lg"
                        style={{ filter: "drop-shadow(0 2px 8px #22d3ee88)" }}
                    />
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-violet-400 to-white bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-violet-300 transition-all">
                        MythicStone
                    </span>
                </Link>
                <nav className="hidden md:flex items-center space-x-2">
                    <Link
                        href="/dungeons"
                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/20 transition-all font-medium"
                    >
                        大秘境列表
                    </Link>
                    <Link
                        href="/leaderboard"
                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-violet-400 hover:bg-violet-900/20 transition-all font-medium"
                    >
                        排行榜
                    </Link>
                    <Link
                        href="/search"
                    /*     target="_blank"
                        rel="noopener noreferrer" */
                        className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold shadow hover:from-cyan-400 hover:to-violet-400 transition-all"
                    >
                        搜索
                    </Link>
                </nav>
                <div className="md:hidden flex items-center">
                    {/* 可添加移动端菜单按钮 */}
                </div>
            </div>
        </header>
    )
}