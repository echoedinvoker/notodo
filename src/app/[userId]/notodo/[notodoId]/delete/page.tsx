import { fetchNotodo } from "@/db/queries/notodos";

interface EditNotodoPageProps {
  params: {
    notodoId: string;
  },
}

export default async function EditNotodoPage({ params: { notodoId } }: EditNotodoPageProps) {
  const notodo = await fetchNotodo(notodoId)

  if (!notodo) {
    return <div>Notodo not found</div>
  }

  return (
    <div className="p-4">
      DELETE NOTODO
    </div>
  )
}
