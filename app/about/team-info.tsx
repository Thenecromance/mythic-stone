export default function TeamInfo() {
    return (
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
         
            <ul className="space-y-4 list-disc list-inside text-gray-300">
                <li>
                    <span className="font-semibold text-blue-400">数据挖掘：</span>
                    <span className="ml-2 text-md text-indigo-300">Thenecromance</span> <span className="text-gray-400">(我本人)</span>
                </li>
                <li>
                    <span className="font-semibold text-blue-400">前端开发：</span>
                    <span className="ml-2 text-md text-indigo-300">Thenecromance</span>, v0, copilot
                </li>
                <li>
                    <span className="font-semibold text-blue-400">后端开发：</span>
                    <span className="ml-2 text-md text-indigo-300">Thenecromance</span>
                </li>
                <li>
                    <span className="font-semibold text-blue-400">UI/UX 设计：</span>
                    <span className="ml-2 text-md text-indigo-300">v0, copilot</span> <span className="text-gray-400">(这个网站还有啥UI/UX设计？)</span>
                </li>
                <li>
                    <span className="font-semibold text-green-400">是的，这个网站从后端到网页都是我一个人制作的</span>
                </li>
            </ul>
        </div>
    )
}