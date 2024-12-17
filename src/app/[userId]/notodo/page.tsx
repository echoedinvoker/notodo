import { fetchNotodos } from "@/db/queries/notodos";
import NotodoList from "@/components/notodo/notodo-list";
import NotodoListActions from "@/components/notodo/notodo-list-actions";
import { Suspense } from "react";
import NotodoListLoading from "@/components/notodo/notodo-list-loading";
import { TheMenu } from "@/components/common";

interface HomeProps {
  params: {
    userId: string;
  }
}

export default async function Home({ params: { userId } }: HomeProps) {

  return (
    <>
      <TheMenu userId={userId} />
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 sm:col-span-3">
            <Suspense fallback={<NotodoListLoading />}>
              <NotodoList fetchNotodos={() => fetchNotodos(userId)} userId={userId} />
            </Suspense>
          </div>
          {/*
             TODO: Remove side menu from this page,
                   replace it with a single button on the row of breadcrumbs,
                   so above notodo list RWD layout also need to be adjusted
          */}
          <NotodoListActions userId={userId} />
        </div>
      </div>
    </>
  )
}
