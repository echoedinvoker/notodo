import { fetchNotodos } from "@/db/queries/notodos";
import NotodoList from "@/components/notodo/notodo-list";
import NotodoListActions from "@/components/notodo/notodo-list-actions";
import { Suspense } from "react";
import NotodoListLoading from "@/components/notodo/notodo-list-loading";

interface HomeProps {
  params: {
    userId: string;
  }
}

export default async function Home({ params: { userId } }: HomeProps) {

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <Suspense fallback={<NotodoListLoading />}>
            <NotodoList fetchNotodos={() => fetchNotodos(userId)} userId={userId} />
          </Suspense>
        </div>
        <NotodoListActions userId={userId} />
      </div>
    </div>
  )
}
