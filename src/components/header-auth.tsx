'use client';

import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { useRouter } from 'next/navigation';

export default function HeaderAuth() {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'loading') {
    return (
      <div className="flex gap-2 justify-center items-center">
        <Skeleton className="w-9 h-9 rounded-full flex-none cursor-pointer border border-stone-300" />
      </div>
    )
  }

  const handleSignOut = async (formData: FormData) => {
    await actions.signOut()
    await session.update()
    router.push('/')
  }

  return (
    <>
      {session.data?.user ? (
        <div className="flex gap-2 justify-center items-center">
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Avatar src={session.data.user.image ?? ''} className="w-9 h-9 flex-none cursor-pointer border border-stone-300" />
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-4">
                <form action={handleSignOut}>
                  <Button type="submit" variant="flat">Sign Out</Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div>
          <form action={actions.signIn}>
            <Button type="submit" variant="flat">Sign In</Button>
          </form>
        </div >
      )}
    </>
  )




}
