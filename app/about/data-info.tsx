export default function DataInfo() {
    return (
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
       
            <ul className="space-y-4 list-disc list-inside text-gray-300">
                <li>
                    <span className="font-semibold text-blue-400">角色数据：</span>
                    <span className="ml-2 text-md text-gray-400">
                        为了避免对官方网站造成过大压力，同样，为了保证服务器的压力，数据会每隔8小时更新一次。
                    </span>
                    <br />
                    <span className="text-sm text-gray-500 ml-6">
                        *假设你在当天的0点查询更新，那么下次数据会的更新时间会在早上8点后的那次查询
                    </span>
                </li>
                <li>
                    <span className="font-semibold text-blue-400">排行榜数据：</span>
                    <span className="ml-2 text-md text-gray-400">
                        更新频率为8小时整理更新一次
                    </span>
                </li>
                <li>
                    <span className="font-semibold text-blue-400">地下城基础数据：</span>
                    <span className="ml-2 text-md text-gray-400">
                        每周更新一次
                    </span>
                </li>
            </ul>
        </div>
    )
}