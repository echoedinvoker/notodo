import { fetchNotodos } from "@/db/queries/notodos";
import NotodoList from "@/components/notodo/notodo-list";
import { Suspense } from "react";
import NotodoListLoading from "@/components/notodo/notodo-list-loading";
import AbsoluteLink from "@/components/common/absolute-link";
import { paths } from "@/paths";

interface HomeProps {
  params: {
    userId: string;
  }
}

export default async function Home({ params: { userId } }: HomeProps) {

  return (
    <div className="max-w-6xl mx-auto p-6">
      <AbsoluteLink href={paths.createNotodoPage(userId)} />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Notodos</h1>
      <div className="max-w-4xl mx-auto"> {/* 調整最大寬度 */}
        <Suspense fallback={<NotodoListLoading />}>
          <NotodoList fetchNotodos={() => fetchNotodos(userId)} userId={userId} />
        </Suspense>
      </div>
      {/* <Suspense fallback={<NotodoListLoading />}> */}
      {/*   <NotodoList fetchNotodos={() => fetchNotodos(userId)} userId={userId} /> */}
      {/* </Suspense> */}
    </div>
  )
}
