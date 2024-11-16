import { db } from "@/db";
import Link from "next/link";
import NotodoShowActions from "@/components/notodo/notodo-show-actions";
import { paths } from "@/paths";

interface NotodoShowPageProps {
  params: {
    notodoId: string;
    userId: string;
  };
}

export default async function NotodoShowPage({ params: { notodoId, userId } }: NotodoShowPageProps) {
  const notodo = await db.notodo.findFirst({
    where: { id: notodoId }
  });
  if (!notodo) {
    return <div>Notodo not found</div>
  }

  return (
    <div>
      <Link href={paths.notodoListPage(userId)}>
        <h1 className="text-xl font-bold text-stone-700">{notodo.title}</h1>
      </Link>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="flex flex-col gap-4 p-4">
            <div>
              <p className="text-stone-600 text-sm whitespace-pre-line">{notodo.content}</p>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4">
              <Link className="flex-1" href={paths.thresholdListPage(userId, notodoId)}>
                <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50 mb-4">
                  <h3>Thresholds</h3>
                  <dl>
                    <dt>Nearest threshold:</dt>
                    <dd>30 minutes meditation (2 hours remaining)</dd>

                    <dt>Top 3 active thresholds:</dt>
                    <dd>
                      <ol>
                        <li>1 hour exercise (weight: 5)</li>
                        <li>30 minutes reading (weight: 3)</li>
                        <li>15 minutes meditation (weight: 2)</li>
                      </ol>
                    </dd>

                    <dt>Recently achieved threshold:</dt>
                    <dd>20 minutes yoga</dd>
                  </dl>
                </div>
              </Link>
              <Link className="flex-1" href={paths.challengeListPage(userId, notodoId)}>
                <div className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 text-stone-700 bg-stone-50 mb-4">
                  <h3>Challenges</h3>
                  <dl>
                    <dt>Total points per hour:</dt>
                    <dd>7.5</dd>

                    <dt>Longest ongoing challenge:</dt>
                    <dd>Exercise (ongoing for 3 days)</dd>

                    <dt>Most recent ongoing challenge:</dt>
                    <dd>Reading (started 2 hours ago)</dd>

                    <dt>Current ongoing challenges:</dt>
                    <dd>3</dd>
                  </dl>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <NotodoShowActions notodo={notodo} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const notodos = await db.notodo.findMany({ include: { user: { select: { id: true } } } });
  return notodos.map(notodo => ({
    notodoId: notodo.id.toString(),
    userId: notodo.user.id.toString()
  }));
}
