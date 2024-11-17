import { Divider } from "@nextui-org/react"
import type { Notodo } from "@prisma/client"

interface NotodoInfoProps {
  notodo: Notodo
}

export default function NotodoInfo({ notodo }: NotodoInfoProps) {
  return (
    <div>
      {notodo.weight && <p className="text-stone-600 italic text-sm">Initial weight: {notodo.weight}</p>}
      {notodo.weight && notodo.content && <Divider className="my-1" />}
      {notodo.content && <div>
        <h3 className="text-stone-600 italic text-sm">Notes:</h3>
        <p className="text-stone-600 italic text-sm">{notodo.content}</p>
      </div>}
    </div>
  )
}
