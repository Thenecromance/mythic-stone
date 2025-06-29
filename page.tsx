"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, CreditCard, LineChart, Lock, Wallet } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "./components/header"
import Footer from "./components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Curved Lines */}
          <svg className="absolute h-full w-full" xmlns="https://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Top Curves */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
              }}
              d="M 100 100 Q 300 0 500 100 T 900 100"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 0.5,
              }}
              d="M 0 200 Q 200 100 400 200 T 800 200"
              fill="none"
              stroke="url(#grad2)"
              strokeWidth="1"
            />
            {/* Bottom Curves */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 1,
              }}
              d="M 100 600 Q 300 500 500 600 T 900 600"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
          </svg>

          {/* Straight Lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                  x: "-100%",
                  opacity: [0, 0.7, 0.7, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                }}
                className="absolute right-0"
                style={{
                  top: `${15 + i * 10}%`,
                  height: "1px",
                  width: "100%",
                  background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "#22d3ee" : "#8b5cf6"}60, transparent)`,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 z-[1]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="container relative z-[3] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-cyan-400 via-violet-400 to-white bg-clip-text text-transparent drop-shadow-lg">
              Mythic Stone Plus
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-300 font-medium">
              专注服务于
              <span className="text-cyan-400 font-bold">《魔兽世界》大秘境</span>
              的查询和统计系统
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:from-cyan-400 hover:to-violet-400 transition-all"
              >
                <Link href="/search">
                  开始搜索！
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cyan-400 text-cyan-300 font-bold px-8 py-4 rounded-xl hover:bg-cyan-900/20 transition-all"
              >
                <Link href="https://github.com/thenecromance/mythic-stone" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
              </Button>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mx-auto mt-8 max-w-xl rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md p-6 text-gray-200"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <span className="inline-flex items-center gap-2 text-cyan-400 font-semibold">
                  <CheckCircle2 className="w-5 h-5" /> 角色评分
                </span>
                <span className="hidden sm:inline-block text-gray-500">|</span>
                <span className="inline-flex items-center gap-2 text-violet-400 font-semibold">
                  <LineChart className="w-5 h-5" /> 历史记录
                </span>
                <span className="hidden sm:inline-block text-gray-500">|</span>
                <span className="inline-flex items-center gap-2 text-cyan-400 font-semibold">
                  <Wallet className="w-5 h-5" /> 插件支持
                </span>
                <span className="hidden sm:inline-block text-gray-500">|</span>
                <span className="inline-flex items-center gap-2 text-violet-400 font-semibold">
                  <Lock className="w-5 h-5" /> 黑名单系统
                </span>
              </div>
            </motion.div>
            <p className="text-base text-gray-400 mt-4">
              帮你摆脱小号间组队的烦恼，轻松查询角色的评分和历史记录
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 border-t border-white/10 bg-black py-24">
        <div className="container px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">这里能做什么</h2>
            <p className="mt-4 text-gray-400">不一样的查询体验</p>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-900/30 via-black/60 to-black/80 p-8 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-cyan-400/80 hover:shadow-cyan-400/20"
            >
              <div className="flex items-center justify-center mb-4">
                <LineChart className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-cyan-300">角色分数与历史</h3>
              <p className="text-gray-300 mb-2">
                查询角色的最高分数、当前评分和详细历史记录，助你轻松了解每个角色的表现。
              </p>
              <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                <li>支持多角色快速切换</li>
                <li>历史分数趋势一目了然</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-900/30 via-black/60 to-black/80 p-8 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-violet-400/80 hover:shadow-violet-400/20"
            >
              <div className="flex items-center justify-center mb-4">
                <CreditCard className="w-10 h-10 text-violet-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-violet-300">分数线与排行榜</h3>
              <p className="text-gray-300 mb-2">
                内置排行榜系统，实时查看你的分数在服务器中的排名，了解自己处于哪个分数段。
              </p>
              <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                <li>分数线每周更新</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-900/30 via-black/60 to-black/80 p-8 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-cyan-400/80 hover:shadow-cyan-400/20"
            >
              <div className="flex items-center justify-center mb-4">
                <Wallet className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-cyan-300">插件支持</h3>
              <p className="text-gray-300 mb-2">
                提供专属插件，让你在游戏内也能便捷查询，无需切换窗口。
              </p>
              <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                <li>插件持续更新</li>
                <li>支持多平台同步</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-900/30 via-black/60 to-black/80 p-8 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-violet-400/80 hover:shadow-violet-400/20"
            >
              <div className="flex items-center justify-center mb-4">
                <Lock className="w-10 h-10 text-violet-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-violet-300">黑名单系统（开发中）</h3>
              <p className="text-gray-300 mb-2">
                一键拉黑，自动同步同战网下所有角色，组队更安心。
              </p>
              <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                <li>黑名单云端同步</li>
                <li>支持自定义备注</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="introduce" className="relative z-10 border-t border-white/10 bg-black py-24">
        <div className="container px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">特别说明</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              在使用本项目前，请仔细阅读以下说明，了解项目的定位、数据来源及注意事项。
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-sm">
              <h3 className="mb-3 text-xl font-bold text-cyan-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> 关于 MythicStone
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 text-base">
                <li>
                  <span className="font-semibold text-white">该项目：</span>
                  仅供个人学习和研究使用。
                </li>
                <li>
                  <span className="font-semibold text-white">数据来源：</span>
                  所有数据均来自于网易暴雪官方 API 接口，数据准确性依赖于官方服务。
                </li>
                <li>
                  <span className="font-semibold text-white">隐私保护：</span>
                  项目不会收集或存储任何用户的敏感信息，所有查询均为匿名操作。
                </li>
                <li>
                  <span className="font-semibold text-white">开源共享：</span>
                  欢迎大家通过 GitHub Issues 或邮件提出建议与意见，共同完善项目。
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-sm flex flex-col gap-4">
              <h3 className="mb-3 text-xl font-bold text-violet-400 flex items-center gap-2">
                <Lock className="w-5 h-5" /> 关于网页与使用
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 text-base">
                <li>
                  <span className="font-semibold text-white">前端能力有限：</span>
                  由于开发者并非专业前端，部分页面可能存在显示或交互问题，敬请谅解。
                </li>
                <li>
                  <span className="font-semibold text-white">持续改进：</span>
                  项目会根据反馈不断优化，欢迎提出宝贵意见。
                </li>
                <li>
                  <span className="font-semibold text-white">插件支持：</span>
                  提供游戏内插件，方便在魔兽世界中直接查询数据。
                </li>
              </ul>
              <Link
                href="https://github.com/thenecromance/mythic-stone"
                className="mt-4 inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>查看 GitHub 项目</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
