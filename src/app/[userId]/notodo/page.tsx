import { db } from "@/db";
import { fetchNotodos } from "@/db/queries/notodos";
import NotodoList from "@/components/notodo/notodo-list";
import NotodoListActions from "@/components/notodo/notodo-list-actions";
import { getNotodosResult } from "@/helpers/utils";

interface HomeProps {
  params: {
    userId: string;
  }
}

export default async function Home({ params: { userId } }: HomeProps) {
  const notodos = await fetchNotodos(userId);
  const { totalScore, totalWeight } = getNotodosResult(notodos);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-stone-700">Notodo List</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <NotodoList userId={userId} notodos={notodos} />
        </div>
        <NotodoListActions userId={userId} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const users = await db.user.findMany()
  return users.map(user => ({
    id: user.id.toString()
  }));
}
