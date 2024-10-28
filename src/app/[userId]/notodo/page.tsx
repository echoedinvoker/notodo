import { db } from "@/db";
import { fetchNotodos } from "@/db/queries/notodos";
import NotodoList from "@/components/notodo/notodo-list";
import NotodoListbox from "@/components/notodo/notodo-list-actions";

interface HomeProps {
  params: {
    userId: string;
  }
}

export default function Home({ params: { userId } }: HomeProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold text-stone-700">Notodo List</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <NotodoList fetchNotodos={() => fetchNotodos(userId)} userId={userId} />
        </div>
        <NotodoListbox userId={userId} />
      </div>
    </div>
  )
}

// export async function generateStaticParams() {
//   const users = await db.user.findMany()
//   return users.map(user => ({
//     id: user.id.toString()
//   }));
// }
