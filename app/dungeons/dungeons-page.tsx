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

                // Mock API data
                const mockDungeons: Dungeon[] = [
                    {
                        "name": "青龙寺",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/temple-of-the-jade-serpent-small.jpg",
                        "description": "青龙寺是一座耸立在潘达利亚东海岸上的寺院，是为纪念传说中的熊猫人皇帝少昊于数千年前大败疑之煞而建立的神圣古迹。不久前，在翡翠林爆发的一场灾难性冲突使煞魔得以逃脱，一些实体化的煞魔对寺院最为宝贵的智慧和知识宝库发起了攻击。"
                    },
                    {
                        "name": "风暴烈酒酿造厂",
                        "upgrade": [
                            2700000,
                            1260000,
                            720000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/stormstout-brewery-small.jpg",
                        "description": "当陈·风暴烈酒抵达四风谷时，他前往了这座与自己同姓的著名酒厂，希望能和亲戚们团聚。可他却发现先祖的家园已经变得面目全非。在高老伯的无能监管下，讨厌的兔妖和顽劣的猢狲都闯进了酿酒厂，还在那搞起了破坏性的狂欢，很快就会中断当地的美酒供应。"
                    },
                    {
                        "name": "残阳关",
                        "upgrade": [
                            2700000,
                            1320000,
                            780000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/gate-of-the-setting-sun-small.jpg",
                        "description": "历代以来，一道名为蟠龙脊的长城保护着潘达利亚的住民，使他们免受狂暴虫族生物——螳螂妖的定期侵袭。这个凶残的种族近来突然打破了入侵周期，提早发起了进攻，打得长城守卫们措手不及。螳螂妖军队中的精兵强将冲击着久经战火的大门，潘达利亚必须抵挡住这片土地有史以来最具破坏力军队的攻势。"
                    },
                    {
                        "name": "影踪禅院",
                        "upgrade": [
                            3600000,
                            2100000,
                            1260000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/shado-pan-monastery-small.jpg",
                        "description": "战争席卷了潘达利亚，而部落和联盟之间的毁灭性冲突也使庄严的影踪禅院爆发了骚乱。在那里，三个邪恶的存在——狂之煞、恨之煞和怒之煞，已逃出牢笼。虽然怒之煞彻底逃出了这座遗世独立的禅院，其余的煞魔却开始迫害那些英勇的影踪派防御者。"
                    },
                    {
                        "name": "围攻砮皂寺",
                        "upgrade": [
                            3000000,
                            1800000,
                            1050000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/siege-of-niuzao-temple-small.jpg",
                        "description": "在那道名为蟠龙脊的雄伟长城远方，有一座砮皂寺，延伸在两座防卫森严的岛屿上。多年以来，坚韧顽强的熊猫人防御者都在守卫着连接岛屿的狭窄桥梁，令任何意欲闯入的侵略者望而却步。然而就在不久前，螳螂妖造出了自己的桥——一段大树根——并出其不意地夺取了其中一座岛屿。现在，这些凶残的虫子又信誓旦旦地宣称要攻击砮皂其余的守卫者。"
                    },
                    {
                        "name": "魔古山宫殿",
                        "upgrade": [
                            2700000,
                            1440000,
                            720000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/mogushan-palace-small.jpg",
                        "description": "古老的魔古山宫殿是魔古族势力在潘达利亚大陆上的最后一座真正的堡垒。魔古族的三大部落近来集结在这座雄伟的宫殿中，觐见他们的王——武器大师席恩。这位强大的统治者已经酝酿出一个激进的计划，要将他散乱的臣民重新联合起来，夺回属于他们覆灭帝国的荣耀。眼下混乱正席卷着潘达利亚，席恩征服一切的远大梦想很可能会变为现实。"
                    },
                    {
                        "name": "通灵学院",
                        "upgrade": [
                            3300000,
                            1980000,
                            1140000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/scholomance-small.jpg",
                        "description": "想要驾驭亡者之力的学徒们都对通灵学院这个名字并不陌生，这是位于凯尔达隆地下黑暗恐怖墓穴中的一所专修亡灵之术的邪恶学院。近些年来，学院更换了几位导师，但教学制度仍在黑暗院长加丁的牢牢掌控之下，他是一位极其施虐成性、阴险狡诈的亡灵法术研习者。"
                    },
                    {
                        "name": "血色大厅",
                        "upgrade": [
                            2700000,
                            1320000,
                            780000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/scarlet-halls-small.jpg",
                        "description": "十字军中最勇猛善战的战士们——那些在这黑暗时期仍坚守阵地、保卫修道院免受侵犯的勇者，正在血色大厅里迅速组成一支军队。这些士兵都与亡灵有着血海深仇，愿意为实现军团的正义事业献出自己的一切。"
                    },
                    {
                        "name": "血色修道院",
                        "upgrade": [
                            2700000,
                            1320000,
                            780000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/scarlet-monastery-small.jpg",
                        "description": "十字军的疯狂领袖们把信徒引进了位于血色修道院中心位置的血色大教堂。这个守卫森严的处所成为了十字军的总指挥部，一些最为狂热和偏执的十字军成员则徘徊在这曾经的神圣之地。"
                    },
                    {
                        "name": "通天峰",
                        "upgrade": [
                            3400000,
                            1700000,
                            1020000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/skyreach-small.jpg",
                        "description": "在阿兰卡峰林的群山之巅，高耸入云的通天峰上坐落着鲁克玛信徒的宝座。掌握了先祖的埃匹希斯技术的鸦人们聚集在一起，准备将高度凝聚的太阳能量倾泻到他们的敌人头上。"
                    },
                    {
                        "name": "血槌炉渣矿井",
                        "upgrade": [
                            3600000,
                            2100000,
                            1320000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/bloodmaul-slag-mines-small.jpg",
                        "description": "在靠近霜火岭北部的某座活火山里，血槌食人魔野蛮地开发着一个矿井。来自德拉诺各地的奴隶被源源不断地送进矿井，最后却没有一个人能活着出来。炉渣矿井盛产宝石和矿石，但据说开掘这些矿井的真正目的是发掘一件具有无穷力量的古代圣物。"
                    },
                    {
                        "name": "奥金顿",
                        "upgrade": [
                            3300000,
                            1920000,
                            1140000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/auchindoun-small.jpg",
                        "description": "奥金顿是德莱尼的神圣陵墓，死者的灵魂将在这座圣光的殿堂中安息。这座水晶建筑还能保护德莱尼的灵魂不受他们的宿敌——不断渴望着德莱尼灵魂的燃烧军团的侵扰。这使得它对急于为其恶魔主子卖命的古尔丹和他的暗影议会格外有吸引力。"
                    },
                    {
                        "name": "影月墓地",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/shadowmoon-burial-grounds-small.jpg",
                        "description": "影月氏族的传统墓地是无数代影月兽人先祖的最后安息之地。堕落的酋长耐奥祖为了追求力量，牺牲了整个氏族的灵魂。如今，先祖的灵魂被惊扰、折磨，并被用来为一个黑暗的仪式提供能量。如果耐奥祖得逞的话，整个德拉诺都将被虚空所吞噬。"
                    },
                    {
                        "name": "恐轨车站",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/grimrail-depot-small.jpg",
                        "description": "恐轨车站是钢铁部落这架战争机器的交通枢纽，源源不断地将军队和黑石铸造厂生产出的物资送往遍布德拉诺的战斗前线。车站得名于“恐轨”号列车，这辆巨型火车能够装下整整一个营的部队和火炮。如今，恐轨号已经装上了一座足以轰开沙塔斯城护盾的巨型轨道炮，即将离站……"
                    },
                    {
                        "name": "黑石塔上层",
                        "upgrade": [
                            5100000,
                            2580000,
                            1500000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/upper-blackrock-spire-small.jpg",
                        "description": "这座雄伟的堡垒有着漫长而复杂的历史。数个世纪前，黑铁氏族在黑石山熔岩沸腾的腹地建成了这座堡垒，最后却被黑龙奈法利安及其子嗣所占据。而黑石塔的上层则成为了铁军先锋的大本营。钢铁部落准备将黑石塔作为其全面入侵艾泽拉斯的桥头堡，为此他们制定了一个可怕的计划：在黑石山的中心架设一座足以毁灭世界的武器。"
                    },
                    {
                        "name": "永茂林地",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-everbloom-small.jpg",
                        "description": "在干扰了黑暗之门的开启后，肯瑞托意识到要想在钢铁部落的土地上与之作战，就需要一条增援的补给线。因此，他们在德拉诺各地建立了岗哨，并用魔法将其与艾泽拉斯相连接。不幸的是，在戈尔隆德有一处靠近黑石铸造厂的战略要地却位于木精的圣地，永茂林地内。岗哨很快就被攻陷，但它仍然能够通往暴风城的郊外……"
                    },
                    {
                        "name": "钢铁码头",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/iron-docks-small.jpg",
                        "description": "坐落于戈尔隆德北部海岸的钢铁码头，在钢铁部落海军力量中有着举足轻重的地位。由黑石铸造厂锻造和组装的巨型战舰和火炮正在这座巨港中整装待发。由钢铁部落驯养的、德拉诺最强大的野兽与精锐步兵组成的地面部队随时可以涌上陆地，击溃所有敢于反抗钢铁部落的敌人。"
                    },
                    {
                        "name": "艾萨拉之眼",
                        "upgrade": [
                            2100000,
                            1680000,
                            1260000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/eye-of-azshara-small.jpg",
                        "description": "在阿苏纳海岸附近的沙洲中，古老的能量之源就隐藏在海涛下面。很久以前，艾萨拉女王的威权统治着这里的土地，而今那些寻找高戈奈斯潮汐之石的纳迦仍然在遵循着她的指令。风起云涌，空气中散乱的能量噼啪作响，预示着即将到来的风暴，艾萨拉的追随者开始召唤她的怒火，想要将整片大陆化作废墟。"
                    },
                    {
                        "name": "黑心林地",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/darkheart-thicket-small.jpg",
                        "description": "在莎拉达希尔的荫影之中，梦魇一寸寸地渗透进了这片曾经繁茂的丛林。最年长最睿智的德鲁伊曾经在这里倾听树木的声音，在伟大的世界之树下冥想，而现在，腐化与疯狂统治了一切。在这片纠缠错乱的树丛深处，梦魇之主萨维斯正在试图让他最有价值的战利品屈从于他的意志。"
                    },
                    {
                        "name": "黑鸦堡垒",
                        "upgrade": [
                            2160000,
                            1728000,
                            1296000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/black-rook-hold-small.jpg",
                        "description": "黑鸦堡垒是古代的精灵石匠在瓦尔莎拉的山峦中雕砌而成的，在上古之战中它是抵抗燃烧军团的壁垒。这座坚不可摧的要塞同时也是伊利丹曾经的导师库塔洛斯·拉文凯斯领主家族的故园。然而在军团最近的一次攻击之后，一股诡异的黑暗能量不断从要塞中涌出，不眠的死者开始在附近的土地上肆虐。"
                    },
                    {
                        "name": "英灵殿",
                        "upgrade": [
                            2280000,
                            1824000,
                            1368000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/halls-of-valor-small.jpg",
                        "description": "在风暴峡湾高空中的云层中，泰坦守护者奥丁召集了全艾泽拉斯最强大的维库战士，组成了他的瓦拉加尔军团。这些飞升的维库人在欢宴的大厅中和狩猎场上检验着他们的力量，准备迎接即将到来的大战。如果想要来到奥丁面前，获得阿格拉玛之盾，冒险者必须穿过这些大厅，证明自己的价值。"
                    },
                    {
                        "name": "奈萨里奥的巢穴",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/neltharions-lair-small.jpg",
                        "description": "大地的守护者奈萨里奥曾将这些洞穴作为住处，后来以“死亡之翼”的名字为世人所知。在他陨落之后，曾经崇拜这头巨龙的卓格巴尔把这座古代巢穴当作了自己的都城。如今，卓格巴尔的酋长达古尔在这些坑道中聚集起了一支庞大的部队。如果没有人阻止他们，这支军队会在卡兹格罗斯之锤的加持下冲下山崖，毁灭至高岭乃至整个艾泽拉斯。"
                    },
                    {
                        "name": "守望者地窟",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/vault-of-the-wardens-small.jpg",
                        "description": "这座隐秘的守望者要塞被阿苏纳的群山遮掩，同时还被施加了魔法的封印，一方面是为了杜绝闯入者，另一方面也是为了不让封锁在要塞中的恐怖生物逃离囚牢。守望者们将许多他们所遭遇过的最危险的敌人封印在地牢之中，但经历了科达娜的叛变与军团的攻击之后，那些生物现在可以在要塞的大厅中不受拘束地行动了。"
                    },
                    {
                        "name": "噬魂之喉",
                        "upgrade": [
                            1440000,
                            1152000,
                            864000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/maw-of-souls-small.jpg",
                        "description": "最伟大的维库战士死去时，灵魂将会飞往金碧辉煌的英灵殿，获得永恒的荣耀；而那些被诅咒的罪人们则会堕入噬魂之喉。在重重迷雾之中，他们将等待纳格法尔的到来，这艘由骨肉建造而成的恐惧之船将会把他们悲惨的灵魂带往冥狱之渊，落入海拉的掌握。"
                    },
                    {
                        "name": "魔法回廊",
                        "upgrade": [
                            2700000,
                            2160000,
                            1620000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-arcway-small.jpg",
                        "description": "苏拉玛城宏伟壮丽，城市地下的管道网络所覆盖的范围比城市更加广阔。夜之子的社会生活是建立在暗夜井能量的基础之上的，而将生命之血般的暗夜井水传递到城市各处的正是地下的魔法回廊。这些迷宫般的建筑已经有数千年的历史，它深埋在城市中高大的建筑地基之下，当今生活在城市中的居民们甚至完全不知道有什么东西潜藏在他们脚下的阴影之中……"
                    },
                    {
                        "name": "群星庭院",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/court-of-stars-small.jpg",
                        "description": "即使燃烧军团的部队在街头上巡逻，让苏拉玛这座伟大的城市变得如同坟墓，夜之子的贵族阶层仍然维持着他们传统与习俗。在这个晴朗的夜晚，觥筹交错的声音回响在清冷的空气中，贵族区最宏伟的府邸打开了大门，迎接一场盛宴。据传言，大魔导师艾利桑德本人也会出席，以确保她最亲密的盟友在经历了最近时局的动荡以后仍然会与她保持一致的立场。"
                    },
                    {
                        "name": "重返卡拉赞（下层）",
                        "upgrade": [
                            2520000,
                            2016000,
                            1512000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/return-to-karazhan-small.jpg",
                        "description": "从它神秘诞生的那一刻起，这座阴暗塔楼的作用就与艾泽拉斯对抗燃烧军团的强大壁垒——提瑞斯法守护者的历史交织在一起。现在，它作为麦迪文的故居而广为人知，他对艾泽拉斯的背叛导致了巨大的悲剧，并使守护者的传承断绝。这样的过往使卡拉赞受到燃烧军团的特别关注，军团已经派出大军，试图在这里开辟与艾泽拉斯居民作战的另一条战线。"
                    },
                    {
                        "name": "永夜大教堂",
                        "upgrade": [
                            2100000,
                            1680000,
                            1260000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/cathedral-of-eternal-night-small.jpg",
                        "description": "萨格拉斯之墓的上层区域曾经是祭祀艾露恩的圣所。自从燃烧军团入侵以后，恶魔爪牙不断扭曲腐化，霸占了这个神圣之地。现在，一场足以扭转局势的战斗即将在这里上演。抗魔联军与燃烧军团正面交锋的同时，一小队英雄潜入大教堂上层，希望能够及时将阿格拉玛之盾放回原来的位置。"
                    },
                    {
                        "name": "重返卡拉赞（上层）",
                        "upgrade": [
                            2100000,
                            1680000,
                            1260000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/return-to-karazhan-small.jpg",
                        "description": "从它神秘诞生的那一刻起，这座阴暗塔楼的作用就与艾泽拉斯对抗燃烧军团的强大壁垒——提瑞斯法守护者的历史交织在一起。现在，它作为麦迪文的故居而广为人知，他对艾泽拉斯的背叛导致了巨大的悲剧，并使守护者的传承断绝。这样的过往使卡拉赞受到燃烧军团的特别关注，军团已经派出大军，试图在这里开辟与艾泽拉斯居民作战的另一条战线。"
                    },
                    {
                        "name": "执政团之座",
                        "upgrade": [
                            2100000,
                            1680000,
                            1260000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/seat-of-the-triumvirate-small.jpg",
                        "description": "执政团之座金碧辉煌的大厅曾是阿古斯的权力中枢——直到艾瑞达与萨格拉斯达成了一笔邪恶交易。由于对维伦的抗命和出逃暴怒不已，基尔加丹下令抛弃执政团之座，以此象征过去的无足轻重……因为军团才是未来。\r\n\r\n曾经金碧辉煌的大厅如今已堕入黑暗，执政团之座辐射出黑暗能量吸引来了一批虚空追随者，妄图驾驭虚空之力并将它倾泻到敌人头上。"
                    },
                    {
                        "name": "阿塔达萨",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/ataldazar-small.jpg",
                        "description": "千万年来，赞达拉诸王都在穆贾巴山巅的阿塔达萨的陵墓中安眠。随着一位又一位统治者的逝去，因为需要修筑新的房间来安置他们庞大的财富，这些金字塔变得越来越复杂。但现在，曾经安静的厅堂已经被先知祖尔和他信赖的副官亚兹玛所腐蚀，后者希望扭曲先王的力量，以实行他们的黑暗阴谋。"
                    },
                    {
                        "name": "自由镇",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/freehold-small.jpg",
                        "description": "自由镇一直是一座避风港，充斥着海盗、恶棍和希望远离库尔提拉斯控制，自由生活的人。现在，铁潮突袭队用铁腕统治着这里，强迫各色海盗都听命于他们。在海盗们集结的同时，一小队英雄必须潜入镇里，消灭他们的领袖，瓦解这支日渐猖獗的凶恶帮派。"
                    },
                    {
                        "name": "托尔达戈",
                        "upgrade": [
                            2160000,
                            1728000,
                            1296000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/tol-dagor-small.jpg",
                        "description": "托尔达戈曾经是座秩序井然的监狱，但后来被艾什凡公司收购运营。如今，只要有人胆敢反抗艾什凡贸易公司，就会被无限期地羁押在这里。"
                    },
                    {
                        "name": "暴富矿区！！",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": true,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-motherlode-small.jpg",
                        "description": "科赞岛因为卡亚罗火山爆发而破败不堪，如今却在萨格拉斯对艾泽拉斯的那一击之后冒出了大量艾泽里特。商业大亨拉兹敦克想要捞上一笔，为拿下贸易亲王的头衔积攒资金。他一门心思让风险投资公司利用艾泽里特来研发武器，好将成果卖给出价最高的买家。"
                    },
                    {
                        "name": "维克雷斯庄园",
                        "upgrade": [
                            2220000,
                            1776000,
                            1332000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/waycrest-manor-small.jpg",
                        "description": "维克雷斯庄园一直是统治德鲁斯瓦的家族的宅邸，有如宫殿一般宏伟。但现在，自从勋爵和夫人闭门不出，这里就成了黑暗谣言的中心。坊间传闻这里在进行秽邪的仪式，夜里有人消失，庄园里还不断传出可怕的尖叫。从这些低语中只能确定一件事，就是维克雷斯家族的这座庄园里，有种邪恶的东西正生根发芽。"
                    },
                    {
                        "name": "诸王之眠",
                        "upgrade": [
                            2520000,
                            2016000,
                            1512000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/kings-rest-small.jpg",
                        "description": "诸王之眠是全赞达拉最为神圣的地方。所有统治过赞达拉帝国的君王、征服者或者暴君都在这座宏伟的亡者之城安息，他们的肉体和灵魂在这里得到保护，受到祭拜。\r\n\r\n一直以来，这里只有赞达拉祭司和皇室才能进入，但如今，祖尔的黑暗魔法正在墓室间穿梭。你必须深入其中，阻止酝酿中的黑暗。"
                    },
                    {
                        "name": "塞塔里斯神庙",
                        "upgrade": [
                            2160000,
                            1728000,
                            1296000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/temple-of-sethraliss-small.jpg",
                        "description": "数个世纪之前，强大的蛇神塞塔里斯牺牲了自己，阻止了米斯拉克斯释放其主人的阴谋，拯救了艾泽拉斯。那一战之后，她虔诚的信徒将她的遗体转移到这里，并修建了一座神庙以静候她的重生。现在，有股黑暗的力量在这座神庙中兴风作浪，想要扭曲她的力量来达成邪恶的目的。"
                    },
                    {
                        "name": "地渊孢林",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-underrot-small.jpg",
                        "description": "在纳兹米尔的沼泽深处，有一种腐化正在地底蔓延。如果不立刻清除，它就会像可怕的瘟疫一样扩散到全世界，只留下溃烂和腐败。"
                    },
                    {
                        "name": "风暴神殿",
                        "upgrade": [
                            2520000,
                            2016000,
                            1512000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/shrine-of-the-storm-small.jpg",
                        "description": "风暴神殿是斯托颂家族和海潮贤者的力量中心。他们在这里举行仪式，祝福库尔提拉斯舰队在战斗中所向披靡。但是，一股黑暗的力量腐化了神圣的殿堂，企图盗取这支舰队的永久控制权。"
                    },
                    {
                        "name": "围攻伯拉勒斯",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/siege-of-boralus-small.jpg",
                        "description": "艾什凡女勋爵趁着首都防御空虚，把她的怒火发泄到了这里。在伯拉勒斯陷入战火之际，一小队英雄必须镇压艾什凡制造的混乱，阻止她夺取这片地区的阴谋。"
                    },
                    {
                        "name": "麦卡贡行动 - 垃圾场",
                        "upgrade": [
                            2280000,
                            1824000,
                            1368000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/operation-mechagon-small.jpg",
                        "description": "艾拉兹敏王子率领着一群神奇的盟友，孤注一掷地深入麦卡贡的心脏。他们必须争分夺秒地击溃麦卡贡国王的机械怪物组成的大军，并击败这个疯狂的天才，否则，他的末日装置将会把艾泽拉斯的所有有机生物全部消灭。"
                    },
                    {
                        "name": "麦卡贡行动 - 车间",
                        "upgrade": [
                            1920000,
                            1536000,
                            1118000
                        ],
                        "is_tracked": true,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/operation-mechagon-small.jpg",
                        "description": "艾拉兹敏王子率领着一群神奇的盟友，孤注一掷地深入麦卡贡的心脏。他们必须争分夺秒地击溃麦卡贡国王的机械怪物组成的大军，并击败这个疯狂的天才，否则，他的末日装置将会把艾泽拉斯的所有有机生物全部消灭。"
                    },
                    {
                        "name": "塞兹仙林的迷雾",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/mists-of-tirna-scithe-small.jpg",
                        "description": "名为塞兹仙林的葱郁林地一直都由法夜精心保护着，因为这里是一处神圣的土地，保存了远古的秘密。据说，旅行者如果不小心，就会永远迷失在被迷雾所笼罩的无数岔路中。但心能的枯竭让炽蓝仙野的森林日渐枯萎，敌人也想要劫掠这片林地的强大魔法。即使是这个国度的原住民，也因为饥饿和绝望而开始吞噬寒冬女王所最珍视的东西。"
                    },
                    {
                        "name": "通灵战潮",
                        "upgrade": [
                            1860000,
                            1488000,
                            1116000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-necrotic-wake-small.jpg",
                        "description": "出于不可思议的原因，玛卓克萨斯这个以守护暗影界为己任的国度发生了叛乱，派出了军队入侵勇气神庙。他们劫掠着心能，将陨落的格里恩用于他们邪恶的计划。如果不加阻止，浮空城佐尔拉姆斯的通灵大军会把晋升堡垒夷为平地。"
                    },
                    {
                        "name": "彼界",
                        "upgrade": [
                            2580000,
                            2064000,
                            1548000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/de-other-side-small.jpg",
                        "description": "邦桑迪在暗影界有个隐秘的场所，他管这里叫彼界。死者被大量送往噬渊时，邦桑迪把其中一部分藏在了他的小小领域里，从而确保自己的巨魔追随者的安全。但这样做打破了他与穆厄扎拉的古老约定。如今，这个古老的洛阿神灵不仅前来收割这些灵魂，还要摧毁他们的守护者。邦桑迪需要人帮忙收集他的一些交易的成果，这样他才能在这场袭击中存活下来，并保护这里的灵魂。"
                    },
                    {
                        "name": "赎罪大厅",
                        "upgrade": [
                            1920000,
                            1536000,
                            1152000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/halls-of-atonement-small.jpg",
                        "description": "在指控者的号令之下，赎罪大厅曾经为雷文德斯的使命带来累累硕果。虽然大厅中回响着苦难和罪孽之声，但这一切都是为了救赎灵魂，使其不坠入噬渊。但最近掌权的宫务大臣却自私的将大厅用于收割心能。由于收割的心能过多，灵魂无法得到救赎。必须有人前来终结这里不断滋生的堕落行为。"
                    },
                    {
                        "name": "凋魂之殇",
                        "upgrade": [
                            2280000,
                            1824000,
                            1368000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/plaguefall-small.jpg",
                        "description": "在凋零密院的废墟下，掩藏着玛卓克萨斯的一种强大的毁灭之力。垂涎这份力量的人们争前恐后地在这片被魔药侵染的残骸中搜索着武器，希望能为自己所用。无论谁拿到了这份财宝，都能掌握暗影界的命运。"
                    },
                    {
                        "name": "赤红深渊",
                        "upgrade": [
                            2460000,
                            1968000,
                            1476000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/sanguine-depths-small.jpg",
                        "description": "赤红深渊隐藏在纳斯利亚堡的地下深处，这座监狱是用来关押德纳修斯大帝最关注的异见者的。这里的囚犯会被关押许多纪元，他们的心能会被抽出来用于研究。堕罪抵抗军知道这里有个特殊的囚犯，有了他，在与德纳修斯的战争中就能占据上风。他们希望有人能提供协助，把他救出来。"
                    },
                    {
                        "name": "晋升高塔",
                        "upgrade": [
                            2340000,
                            1872000,
                            1404000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/spires-of-ascension-small.jpg",
                        "description": "晋升高塔飘浮在云端，体现着格里恩理念的巅峰，是执政官的权力宝座。她作为晋升堡垒的统治者，无数纪元里从未遭受质疑和挑战。她一直都是职责和奉献这些美德的化身。但心能枯竭和时局的不稳定让晋升者的信仰系统产生了裂痕，执政官的统治面临着无法想象的威胁，因为她最信任的一位追随者听信了最黑暗的魔鬼的谗言。"
                    },
                    {
                        "name": "伤逝剧场",
                        "upgrade": [
                            2040000,
                            1632000,
                            1224000
                        ],
                        "is_tracked": true,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/theater-of-pain-small.jpg",
                        "description": "在玛卓克萨斯，你必须不断面对考验，以证明自己是暗影界最强的守护者。而最能证明自己的地方就是伤逝剧场。如织的参赛者彼此对垒，想要挑战这里的勇士。凶狠！混乱！残暴！痛苦！只有最强大的人才能成为他们所属密院的勇士，这份殊荣独一无二。"
                    },
                    {
                        "name": "塔扎维什：琳彩天街",
                        "upgrade": [
                            2340000,
                            1872000,
                            1404000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/tazavesh-the-veiled-market-small.jpg",
                        "description": "无情的财团老板索·莉亚打算发起一场横跨诸界的大劫案，意图将元尊的奥秘据为己有。唯一与她作对的，就是声名狼藉的艾·达里尔和他临时召集的草台班子。他们必须在神秘莫测的帷纱集市中探寻一条明路，阻止索·莉亚染指禁忌的力量。"
                    },
                    {
                        "name": "塔扎维什：索·莉亚的宏图",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/tazavesh-the-veiled-market-small.jpg",
                        "description": "无情的财团老板索·莉亚打算发起一场横跨诸界的大劫案，意图将元尊的奥秘据为己有。唯一与她作对的，就是声名狼藉的艾·达里尔和他临时召集的草台班子。他们必须在神秘莫测的帷纱集市中探寻一条明路，阻止索·莉亚染指禁忌的力量。"
                    },
                    {
                        "name": "红玉新生法池",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/ruby-life-pools-small.jpg",
                        "description": "作为五大巨龙军团的先祖巢穴，红玉新生法池是一片神圣之地。红龙军团负责孕育所有的生命，他们保护着这些法池，也守护着所有龙族的未来。\r\n\r\n然而，莱萨杰丝和她的拜荒者们已经到来，他们试图盗走龙族的未来，并将自己的力量注入神圣的法池。只有阻止他们的疯狂行径，才能让龙族茁壮成长。"
                    },
                    {
                        "name": "诺库德阻击战",
                        "upgrade": [
                            2400000,
                            1920000,
                            1440000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-nokhud-offensive-small.jpg",
                        "description": "在诺库德氏族囚禁上古鹰隼之魂后，氏族内战如野火燎原，在欧恩哈拉平原上蔓延开来。对其余氏族来说，欧恩哈拉不仅仅是一只鹰魂，更是他们的女神。拜荒者召唤出元素力量，通灵师则对半人马之魂发号施令。被敌人围攻的马鲁克氏族团结一心。远处诺库德的暴君居高临下，这位巴拉卡可汗正在高声指挥着自己的军队。在敌方部队溃败之前，他们都会无情地发起进攻。一场大战在即。"
                    },
                    {
                        "name": "碧蓝魔馆",
                        "upgrade": [
                            2250000,
                            1800000,
                            1350000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-azure-vault-small.jpg",
                        "description": "很久以前，玛里苟斯创立了碧蓝魔馆，供辛达苟萨在此编目和存放他所找到的魔法神器。经过了上万年的封闭与废弃，魔馆早已年久失修，极易受到来自外部……以及内部的威胁。"
                    },
                    {
                        "name": "艾杰斯亚学院",
                        "upgrade": [
                            1920000,
                            1536000,
                            1152000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/algethar-academy-small.jpg",
                        "description": "很久以前，宏伟的艾杰斯亚学院是所有龙族接受高等教育之地。尽管学院和群岛上的其他地方一样陷入了沉眠，但最近已经重新开放，并在首席教师多拉苟萨的指导下走向正轨。学院迎来了一连串的可喜变化，目前正在寻找龙族及其他种族的新学生和志愿者，以此帮助这座教学殿堂恢复往日语笑喧哗的盛景。相信在学院操场上散步的人一定会学到些新东西。"
                    },
                    {
                        "name": "奥达曼：提尔的遗产",
                        "upgrade": [
                            2100000,
                            1680000,
                            1260000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/uldaman-legacy-of-tyr-small.jpg",
                        "description": "奥达曼是一座古老的泰坦设施，很久以前，英雄守护者提尔的盟友将诺甘农圆盘隐藏于此。\r\n\r\n回归巨龙群岛之后，阿莱克丝塔萨女王得知奥达曼中尘封着另一片圆盘……里面保存着提尔的记忆。阿莱克丝塔萨相信这些知识有助于恢复守护巨龙之力，她恳求她的凡人盟友们勇敢直面奥达曼的危险，恢复提尔的记忆，以此守护龙裔的未来。"
                    },
                    {
                        "name": "奈萨鲁斯",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/neltharus-small.jpg",
                        "description": "黑曜堡垒的下方就是奈萨鲁斯，黑龙军团的珍宝和传奇铸工的秘密就藏在这里。当贾拉丁从沉眠中苏醒，他们将奈萨鲁斯选做了袭击的突破口。他们惊讶地发现此地荒废已久，并立即将深藏的秘密据为己有……还夺占了黑曜堡垒的其余部分。"
                    },
                    {
                        "name": "蕨皮山谷",
                        "upgrade": [
                            2100000,
                            1680000,
                            1260000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/brackenhide-hollow-small.jpg",
                        "description": "蕨皮山谷是巨龙群岛规模最大的豺狼人聚居地，隐藏着难以言喻的危险。腐朽正从山谷中渗出，蔓延到碧蓝林海的各个豺狼人部族之中，企图腐化所有生灵。山谷的中心居住着蕨皮领袖，也隐藏着她与扭曲的同胞欣然分享的知识。"
                    },
                    {
                        "name": "注能大厅",
                        "upgrade": [
                            2100000,
                            1680000,
                            1260000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/halls-of-infusion-small.jpg",
                        "description": "注能大厅深藏在提尔要塞下方。这座建筑位于一处远古水源之上，守护者提尔将这里的水源引向了红龙军团的新生法池。 随着巨龙群岛的苏醒，拜荒者部队入侵了这些大厅。他们是来摧毁这里……还是想要揭露提尔留下的秘密？"
                    },
                    {
                        "name": "旋云之巅",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-vortex-pinnacle-small.jpg",
                        "description": "旋云之巅位于风元素位面的天空之墙中。其建筑群优雅无比、镶金注铜，矗立在座座平台之上，以空气为桥相互连接。然而在其光鲜的外表之中，驻扎着尼斐塞特的托维尔人，以及风元素领主奥拉基尔无情的元素军团。只要天空之墙和艾泽拉斯之间的障壁通畅无阻，恐惧将不断从天空中降临在奥丹姆之上。"
                    },
                    {
                        "name": "潮汐王座",
                        "upgrade": [
                            2040000,
                            1632000,
                            1224000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/throne-of-the-tides-small.jpg",
                        "description": "在深渊之喉无底的广袤深处，座落着潮汐王座。在那里，伟大的元素领主，猎潮者耐普图隆坚守着他的水域。现在，蛇行的纳迦和凶残的无面者成了他的心腹大敌，威胁着他的统治，觊觎着他的王国，垂涎着其中的秘密。"
                    },
                    {
                        "name": "永恒黎明：迦拉克隆的陨落",
                        "upgrade": [
                            2040000,
                            1632000,
                            1224000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/dawn-of-the-infinite-small.jpg",
                        "description": "一万年来，青铜神殿一直沉寂着，等待着青铜龙军团的回归。但青铜龙刚刚夺回自己的神殿，黑暗的力量就企图夺走它。永恒龙会控制时间流，并让姆诺兹多崛起吗？艾泽拉斯的勇士们必须在时光里冒险，确保艾泽拉斯拥有光明的未来。"
                    },
                    {
                        "name": "永恒黎明：姆诺兹多的崛起",
                        "upgrade": [
                            2160000,
                            1728000,
                            1296000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/dawn-of-the-infinite-small.jpg",
                        "description": "一万年来，青铜神殿一直沉寂着，等待着青铜龙军团的回归。但青铜龙刚刚夺回自己的神殿，黑暗的力量就企图夺走它。永恒龙会控制时间流，并让姆诺兹多崛起吗？艾泽拉斯的勇士们必须在时光里冒险，确保艾泽拉斯拥有光明的未来。"
                    },
                    {
                        "name": "圣焰隐修院",
                        "upgrade": [
                            1950000,
                            1560000,
                            1170000
                        ],
                        "is_tracked": true,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/priory-of-the-sacred-flame-small.jpg",
                        "description": "圣焰隐修院是为狂热的信徒所建，供其在此研究帝皇幻象的奥秘。这里的信徒远离米雷达尔的人民，鄙视他们软弱的信仰。艾特娜·布雷兹修女正在寻求帮助，希望能够查清隐修院长穆普雷在内部密室中隐藏的秘密。"
                    },
                    {
                        "name": "驭雷栖巢",
                        "upgrade": [
                            1740000,
                            1392000,
                            1044000
                        ],
                        "is_tracked": true,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-rookery-small.jpg",
                        "description": "风暴之栖不仅是雷鸫的家园和栖息地，也是风暴护持贝尔格里姆和驭雷者的军营和总部。数千年来，风暴之栖从未被土灵的敌人攻破。可坚固的城堡总是从内部被攻破，驭雷栖巢的防御工事的情况也不容乐观。"
                    },
                    {
                        "name": "矶石宝库",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-stonevault-small.jpg",
                        "description": "矶石宝库是一处毗邻觉醒大厅的设施，由机语者负责维护。而后者的前任领袖虚空代言人艾里克，最近因感染虚空腐化而被废黜。机械师们在劳作，拥护者们在巡逻，艾里克则躲在他最狂热和腐败的追随者身后。他隔离在泰坦通道的后面，并经历了一次可怕的转变。为了确保他不会重新掌权，你必须迅速采取行动。"
                    },
                    {
                        "name": "千丝之城",
                        "upgrade": [
                            2100000,
                            1680000,
                            1260000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/city-of-threads-small.jpg",
                        "description": "蜕躯工厂位于千丝之城的深处——这里曾经是蛛魔进化的神圣大厅，如今成为了“适格”蛛魔的扬升之地。纺丝者和宰相愿意不惜一切代价阻止其中的勾当，以防它将整个艾基-卡赫特吞噬殆尽。"
                    },
                    {
                        "name": "艾拉-卡拉，回响之城",
                        "upgrade": [
                            1800000,
                            1440000,
                            1080000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/ara-kara-city-of-echoes-small.jpg",
                        "description": "艾拉-卡拉，回响之城就在千丝之城的下方，是后者被遗弃的底层废墟。安苏雷克的部队正在那里收割危险的材料，试图在必要的时候让所有蛛魔扬升——无论他们情愿与否。"
                    },
                    {
                        "name": "暗焰裂口",
                        "upgrade": [
                            1860000,
                            1488000,
                            1116000
                        ],
                        "is_tracked": true,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/darkflame-cleft-small.jpg",
                        "description": "暗焰裂口曾是一处繁荣的土灵矿场，但最终还是日落西山。土灵机语者走了，不久之后，狗头人蜂拥而至。工人们很快就受到了暴君蜡烛之王的压迫。这个高大残忍的家伙比他臣民的块头大得多。显眼的财富很久之前就被榨干了。这里真正的良机是击败蜡烛之王仅存的凶残打手，解放其中受尽恐吓的狗头人。"
                    },
                    {
                        "name": "破晨号",
                        "upgrade": [
                            1860000,
                            1488000,
                            1116000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/the-dawnbreaker-small.jpg",
                        "description": "阿拉希人的旗舰破晨号已经建造完成。这艘全新的战舰拥有强大的火力，可以在对抗艾基-卡赫特的漫长战争中扭转战局。首航仪式即将开始，斯蒂泰克将军邀请了英勇的外来者来见证这一历史性的时刻。"
                    },
                    {
                        "name": "燧酿酒庄",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": true,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/cinderbrew-meadery-small.jpg",
                        "description": "老板换人了！燧酿酒庄曾经饱含无缚者土灵文化的精髓，在文布兰德的老派管理下酿造出了所有土灵都赞不绝口的烈性美酒。可如今，酒庄被一位地精老板戈尔迪·底爵恶意收购，走进了大批量生产燧酿的“新纪元”。"
                    },
                    {
                        "name": "格瑞姆巴托",
                        "upgrade": [
                            2040000,
                            1632000,
                            1224000
                        ],
                        "is_tracked": false,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/grim-batol-small.jpg",
                        "description": "别被格瑞姆巴托寒酸的外观所蒙蔽了，这座山中堡垒许多被亵渎的殿堂都深埋在暮光高地里。这里曾是蛮锤矮人的要塞，后来被兽人占领，当成了关押阿莱克丝塔萨的监狱。如今这座城池落在了暮光之锤邪教的手中。\r\n\r\n敢于深入要塞的英雄们，不但要面对死亡之翼的爪牙，还要铲除其中的邪恶势力。"
                    },
                    {
                        "name": "水闸行动",
                        "upgrade": [
                            1980000,
                            1584000,
                            1188000
                        ],
                        "is_tracked": true,
                        "assets": "https://render.worldofwarcraft.com/tw/zones/operation-floodgate-small.jpg",
                        "description": "特工“剃刀”雷吉克指挥的秘密行动已经展开，他们将潜入水能堡大坝，渗透暗索的卑鄙工程。加里维克斯的阴谋诡计需要大量的能源，要想切断供应，就必须铲除在幕后操弄一切的疯狂科学家。"
                    }
                ]

                setDungeons(mockDungeons)
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
