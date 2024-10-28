import { useFormState } from "react-dom"
import * as actions from "@/actions"
import FormButton from "../common/FormButton"
import { FaTrash } from "react-icons/fa";

interface NotodoShowActionDeleteProps {
  notodoId: string;
}

export default function NotodoShowActionDelete({ notodoId }: NotodoShowActionDeleteProps) {
  const [formState, action] = useFormState(actions.deleteNotodo.bind(null, notodoId), { errors: {} })
  return (
    <form action={action}>
      <FormButton
        variant="light"
        startContent={<div><FaTrash size="10" /></div>}
        className="no-hover-effect w-full flex items-center justify-start text-stone-700"
        size="sm"
      >Delete Notodo</FormButton>
    </form>
  )
}
