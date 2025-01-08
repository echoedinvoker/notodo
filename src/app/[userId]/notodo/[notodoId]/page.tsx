import { db } from "@/db";
import { paths } from "@/paths";
import Link from "next/link";

interface NotodoShowPageProps {
  params: {
    userId: string;
    notodoId: string;
  };
}

export default async function NotodoShowPage({ params: { userId, notodoId } }: NotodoShowPageProps) {
  const notodo = await db.notodo.findFirst({
    where: { id: notodoId },
    include: {
      challenges: true
    },
  });

  if (!notodo) {
    return <div className="text-center text-red-500 text-xl mt-10">Notodo not found</div>
  }

  const currentChallenge = notodo.challenges.find(challenge => !challenge.endTime)

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center sm:text-left text-2xl font-bold mb-6 text-gray-800">{notodo.title}</h1>

      {notodo.weight !== null
        ? <div className="mb-4 text-lg text-stone-600">Initial points per hours: <span className="font-semibold">{notodo.weight}</span></div>
        : <div className="flex gap-5 mb-4 ">
          <div className="text-lg text-stone-400 italic">Notodo is not weighted</div>
          <Link
            href={`${paths.editNotodoPage(userId, notodoId)}?enableWeight=true`}
            className="px-3 py-1 bg-stone-400 text-white text-sm font-medium rounded-lg hover:bg-stone-500 transition duration-300 shadow-sm"
            prefetch
          >Turn on weight</Link>
        </div>
      }

      <div className="flex items-center gap-3 mb-6">
        <span className="text-lg text-gray-700">
          Current status:
        </span>
        {currentChallenge
          ? <div className="w-5 h-5 rounded-full bg-green-500 animate-pulse"></div>
          : <div className="w-5 h-5 rounded-full bg-gray-500"></div>}
        <span className="text-lg text-gray-700">
          {currentChallenge ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Notodo notes:</h2>
        <p className="text-gray-700 bg-gray-100 p-4 rounded-md">{notodo.content}</p>
      </div>

      <div className="flex justify-center sm:justify-end gap-4">
        <Link
          href={paths.editNotodoPage(userId, notodoId)}
          className="min-w-24 px-4 py-2 bg-blue-500 text-white text-center uppercase font-bold tracking-wider rounded hover:bg-blue-600 transition duration-300"
        >
          Edit
        </Link>
        <Link
          href={paths.deleteNotodoPage(userId, notodoId)}
          className="min-w-24 px-4 py-2 bg-red-500 text-white text-center uppercase font-bold tracking-wider rounded hover:bg-red-600 transition duration-300"
        >
          Delete
        </Link>
      </div>
    </div>
  )
}
