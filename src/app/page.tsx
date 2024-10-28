import { auth } from "@/auth"
import { paths } from "@/paths"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    redirect(paths.notodoListPage(session.user.id))
  }

  return <div>Home</div>
}

