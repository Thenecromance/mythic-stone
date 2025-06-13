import Layout from "@/components/layout";
import TeamInfo from "./team-info";
import DataInfo from "./data-info";
import HardWare from "./hardware";
import AccurateInfo from "./accurate-info";

export default function AboutPage() {
    return (
        <Layout>
            <main className="min-h-screen from-gray-950 via-gray-900 to-gray-800 py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl font-extrabold mb-6 text-center text-white drop-shadow-lg tracking-tight">
                        关于网站
                    </h1>
                    <p className="mb-12 text-lg text-gray-300 text-center">
                        该网站是一个专注于《魔兽世界》国服大秘境数据服务的第三方网站，旨在为玩家提供更便捷的查询和分析工具。
                    </p>
                    <section className="space-y-14">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-blue-300 tracking-wide text-center">
                                开发
                            </h2>
                            <TeamInfo />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-blue-300 tracking-wide text-center">
                                数据更新频率
                            </h2>
                            <DataInfo />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-blue-300 tracking-wide text-center">
                                数据精度说明
                            </h2>
                            <AccurateInfo />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-blue-300 tracking-wide text-center">
                                服务器与技术栈
                            </h2>
                            <HardWare />
                        </div>
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold mb-2 text-gray-300 text-center">关于版权</h2>
                            <p className="text-gray-500 text-center text-sm">
                                本网站为粉丝网站，所有《魔兽世界》相关内容，包括但不限于游戏本身，均为暴雪娱乐和网易版权所有。本网站不隶属于暴雪娱乐或网易，也不受暴雪娱乐或网易认可。
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    )
}