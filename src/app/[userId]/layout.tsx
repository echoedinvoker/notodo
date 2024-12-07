import { fetchNotodos } from "@/db/queries/notodos";
import { BreadcrumbsComponent, ToggleMenu } from '@/components/common'
import Header from '@/components/header'

interface LayoutProps {
  children: React.ReactNode
  params: {
    userId: string
  }
}


export default function Layout({ children, params: { userId } }: LayoutProps) {
  return (
    <>
      <Header fetchNotodos={() => fetchNotodos(userId)} userId={userId} />
      <div className="flex justify-between align-center">
        <BreadcrumbsComponent />
        <ToggleMenu />
      </div>
      {children}
    </>
  )
}
