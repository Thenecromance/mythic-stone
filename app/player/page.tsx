import { Suspense } from "react"
import SearchResultsPage from "./results-page"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsPage />
    </Suspense>
  )
}
