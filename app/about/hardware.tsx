export default function HardWare() {
    return (
        <div className="bg-gray-900 rounded-lg shadow-md p-6">

            <ul className="space-y-4 list-disc list-inside text-gray-300">
                <li>
                    <span className="font-semibold text-blue-400">服务器硬件：</span>
                    <span className="ml-2 text-md text-indigo-300">Tencent Lighthouse: 2Core, 4G</span>
                    <span className="text-sm text-gray-500 ml-2">*服务器配置较低，请谨慎使用</span>
                </li>
                <li>
                    <span className="font-semibold text-blue-400">数据库：</span>
                    <span className="ml-2 text-md text-indigo-300">MySQL</span>
                </li>
                <li>
                    <span className="font-semibold text-blue-400">前端框架：</span>
                    <span className="ml-2 text-md text-indigo-300">Next.js 14</span>
                    <span className="text-sm text-gray-500 ml-2">*Typescript我只随便的看了一个星期左右，然后随便写的...</span>
                </li>
                <li>
                    <span className="font-semibold text-blue-400">后端框架：</span>
                    <span className="ml-2 text-md text-indigo-300">Gin+Fx</span>
                </li>
            </ul>
        </div>
    )
}