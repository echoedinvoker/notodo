import { fetchNotodos } from "@/db/queries/notodos";
import { fetchRewardClaims } from "@/db/queries/rewardClaims";
import { BreadcrumbsComponent } from '@/components/common'
import Header from '@/components/header'
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode
  params: {
    userId: string
  }
}


export default async function Layout({ children, params: { userId } }: LayoutProps) {
  const session = await auth();

  if (!session) redirect('/')

  return (
    <>
      <Header
        fetchNotodos={() => fetchNotodos(userId)}
        fetchRewardClaims={() => fetchRewardClaims(userId)}
        userId={userId}
      />
      <div className="relative">
        {/* TODO: consider to remove breadcrumbs at all, use Link to make things more clear and easy */}
        <BreadcrumbsComponent />
        {children}
      </div>
    </>
  )
}
