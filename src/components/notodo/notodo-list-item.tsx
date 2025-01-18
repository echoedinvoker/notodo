import { NotodoWithData } from "@/db/queries/notodos";
import NotodoListItemAction from "./notodo-list-item-action";
import NotodoListItemInfo from "./notodo-list-item-info";
import NotodoListItemTitle from "./notodo-list-item-title";

interface NotodoListItemProps {
  notodo: NotodoWithData;
  [key: string]: any;
}

export default function NotodoListItem({ notodo, ...props }: NotodoListItemProps) {
  return (
    <div className="relative group bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden min-h-[200px]" {...props}>
      <div className="p-5 pr-12 h-full flex flex-col">
        <NotodoListItemTitle notodo={notodo} />
        <div className="mt-4 flex-grow">
          <NotodoListItemInfo notodo={notodo} />
        </div>
      </div>
      <NotodoListItemAction notodo={notodo} />
    </div>
  );
}
