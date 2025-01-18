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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Notodos</h1>
        <AbsoluteLink href={paths.createNotodoPage(userId)}>
          Create Notodo
        </AbsoluteLink>
      </div>
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<NotodoListLoading />}>
          <NotodoList fetchNotodos={() => fetchNotodos(userId)} userId={userId} />
        </Suspense>
      </div>
    </div>
  )
}
