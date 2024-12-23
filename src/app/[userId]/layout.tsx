import { fetchNotodos } from "@/db/queries/notodos";
import { fetchRewardClaims } from "@/db/queries/rewardClaims";
import { BreadcrumbsComponent } from '@/components/common'
import Header from '@/components/header'

interface LayoutProps {
  children: React.ReactNode
  params: {
    userId: string
  }
}


export default async function Layout({ children, params: { userId } }: LayoutProps) {

  return (
    <>
      <Header
        fetchNotodos={() => fetchNotodos(userId)}
        fetchRewardClaims={() => fetchRewardClaims(userId)}
        userId={userId}
      />
      <div className="relative">
        <BreadcrumbsComponent />
        {children}
      </div>
    </>
  )
}
