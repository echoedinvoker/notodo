import { fetchNotodos } from "@/db/queries/notodos";
import NotodoList from "@/components/notodo/notodo-list";
import { Suspense } from "react";
import NotodoListLoading from "@/components/notodo/notodo-list-loading";
import NotodoCreateLink from "@/components/notodo/notodo-create-link";

interface HomeProps {
  params: {
    userId: string;
  }
}

export default async function Home({ params: { userId } }: HomeProps) {

  return (
    <>
      <NotodoCreateLink userId={userId} />
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <Suspense fallback={<NotodoListLoading />}>
              <NotodoList fetchNotodos={() => fetchNotodos(userId)} userId={userId} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
