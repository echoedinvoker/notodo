'use client';

import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa'; // 引入 GitHub 和 Google 圖標

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

  const handleSignIn = (provider: 'github' | 'google') => {
    return () => actions.signIn(provider);
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
        // TODO: when small screen, right button will be out of parent div, need to fix
        <div className="flex gap-2">
          <form action={handleSignIn('github')}>
            <Button type="submit" variant="flat" startContent={<FaGithub />}>
              GitHub
            </Button>
          </form>
          <form action={handleSignIn('google')}>
            <Button type="submit" variant="flat" startContent={<FaGoogle />}>
              Google
            </Button>
          </form>
        </div>
      )}
    </>
  )




}
