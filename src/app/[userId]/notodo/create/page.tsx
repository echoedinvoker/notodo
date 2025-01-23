import NotodoCreateForm from "@/components/notodo/notodo-create-form";


interface CreateNotodoPageProps {
  params: {
    userId: string;
  }
}

export default function CreateNotodoPage({ params: { userId } }: CreateNotodoPageProps) {

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Notodo</h1>
      <NotodoCreateForm userId={userId} />
    </div>
  )
}
