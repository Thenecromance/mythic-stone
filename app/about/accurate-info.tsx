export default function AccurateInfo() {
    return (
        <div className="bg-gray-900 rounded-lg shadow-md p-6">

            <ul className="space-y-4 list-disc list-inside text-gray-300">
                <li>
                    <span className="font-semibold text-blue-400">本周大秘境最佳数据：</span>
                    <span className="ml-2 text-md text-gray-400">
                        这里只会显示你当周完成和未完成的最佳大秘境记录，不会显示你本周打了几个。
                    </span>
                </li>
                <li>
                    <span className="font-semibold text-blue-400">排行榜记录：</span>
                    <span className="ml-2 text-md text-gray-400">
                        即使我通过算法获得了绝大多数打大秘境玩家的基础记录，但是经过实际测试，周围还是会有很多没有被记录的玩家，以及不允许公开访问的角色信息。
                    </span>
                    <br />
                    <span className="text-red-400 font-medium block mt-2">
                        因此，无法保证排行榜数据的完整性和准确性，仅供参考。
                    </span>
                </li>
            </ul>
        </div>
    )
}