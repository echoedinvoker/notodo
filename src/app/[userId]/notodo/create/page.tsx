import NotodoCreateForm from "@/components/notodo/notodo-create-form";


interface CreateNotodoPageProps {
  params: {
    userId: string;
  }
}

export default function CreateNotodoPage({ params: { userId } }: CreateNotodoPageProps) {

  return (
    <div className="p-4">
      <NotodoCreateForm userId={userId} />
    </div>
  )
}
