'use client';

import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { useRouter } from 'next/navigation';

export default function HeaderAuth() {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'loading') {
    return null
  }

  const handleSignOut = async (formData: FormData) => {
    await actions.signOut()
    await session.update()
    router.push('/')
  }

  return (
    <>
      {session.data?.user ? (
        <div>
          <Popover placement="left-end">
            <PopoverTrigger>
              <Avatar src={session.data.user.image ?? ''} className="cursor-pointer border border-stone-300" />
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
