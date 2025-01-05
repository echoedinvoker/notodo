import { NotodoWithData } from "@/db/queries/notodos";
// import Link from "next/link";
// import { paths } from "@/paths";

interface NotodoListItemTitleProps {
  notodo: NotodoWithData;
}

export default function NotodoListItemTitle({ notodo }: NotodoListItemTitleProps) {
  return (
    <div className="w-full flex justify-between">

      {/* TODO: enable this link when the notodo page is ready */}
      {/* <Link */}
      {/*   className="shadow-sm hover:shadow-md transition bg-stone-200 hover:bg-stone-300 rounded-md w-full text-stone-500 px-2 hover:-translate-y-0.5 active:-translate-y-0" */}
      {/*   href={paths.notodoShowPage(notodo.user.id, notodo.id)}> */}
      {/*   <h3 className="text-md font-semibold my-1 select-none">{notodo.title}</h3> */}
      {/* </Link > */}
      <div className="shadow-sm group-hover:shadow-md transition bg-stone-200 group-hover:bg-stone-300 rounded-md w-full text-stone-500 px-2 group-hover:-translate-y-0.5 active:-translate-y-0">
        <h3 className="text-md font-semibold my-1 select-none">{notodo.title}</h3>
      </div>

      <div className="w-4"></div>
    </div>
  );
}
