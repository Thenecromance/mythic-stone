import { Suspense } from "react"
import LeaderboardPage from "./leaderboard-page"

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LeaderboardPage />
        </Suspense>
    )
}
