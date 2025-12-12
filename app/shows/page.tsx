import { Suspense } from "react"
import { getShows } from "@/utils/fetchData"
import ShowListing from "@/components/ShowListing"

export default async function ShowsPage() {
  const shows = await getShows()
  return (
    <Suspense>
      <ShowListing initialShows={shows} />
    </Suspense>
  )
}
