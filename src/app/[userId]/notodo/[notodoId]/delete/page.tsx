import * as actions from "@/actions"
import { FormButton } from "@/components/common";

interface EditNotodoPageProps {
  params: {
    notodoId: string;
  },
}

export default async function EditNotodoPage({ params: { notodoId } }: EditNotodoPageProps) {

  return (
    <div className="p-12 flex flex-col gap-6 items-start justify-around">
      <form action={actions.deleteNotodo.bind(null, notodoId)} className="w-full text-center">
        <FormButton className="uppercase font-semibold min-w-[300px] hover:bg-red-500 hover:text-white">
          Delete and remove effect
        </FormButton>
      </form>
      <form action={actions.deleteNotodoKeepPoint.bind(null, notodoId)} className="w-full text-center">
        <FormButton className="uppercase font-semibold min-w-[300px] hover:bg-red-500 hover:text-white">
          Delete and keep effect
        </FormButton>
      </form>
    </div>
  )
}
