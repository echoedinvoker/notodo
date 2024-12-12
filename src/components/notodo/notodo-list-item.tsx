import { NotodoWithData } from "@/db/queries/notodos";
import { Divider } from "@nextui-org/react";
import NotodoListItemAction from "./notodo-list-item-action";
import NotodoListItemInfo from "./notodo-list-item-info";
import NotodoListItemTitle from "./notodo-list-item-title";

interface NotodoListItemProps {
  notodo: NotodoWithData;
  [key: string]: any;
}

export default function NotodoListItem({ notodo, ...props }: NotodoListItemProps) {
  return (
    <div className="relative group rounded-lg py-3 px-5 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50 active:bg-stone-100" {...props}>
      <div className="h-full flex flex-col justify-start items-start">
        <NotodoListItemTitle notodo={notodo} />
        <Divider className="my-1" />
        <NotodoListItemInfo notodo={notodo} />
      </div>
      <NotodoListItemAction notodo={notodo} />
    </div >
  );
}
