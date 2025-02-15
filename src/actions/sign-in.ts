'use server';

import * as auth from '@/auth';

export async function signIn(provider: 'github' | 'google') {
  return auth.signIn(provider);
}
