'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Session } from '@supabase/auth-helpers-nextjs'

export default function LoginForm({ session }: { session: Session | null }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      username,
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <button onClick={handleSignOut}>Sign out</button>
  ) : (
    <div className=' p-10 w-[400px] h-[400px] mt-10 bg-white flex flex-col justify-center align-center border rounded b-1 shadow'>
      <h1 className='text-2xl font-bold'>Sign up or Sign in!</h1>
      <input 
      name="username" 
      placeholder='username'
      onChange={(e) => setUsername(e.target.value)} 
      className='border b-2 rounded mt-2'
      value={username}
       />
      <input 
      type="email"
      name="email" 
      placeholder='email'
      onChange={(e) => setEmail(e.target.value)} 
      className='border b-2 rounded mt-2'
      value={email}
       />
      <input
        type="password"
        name="password"
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
        className='border b-2 rounded mt-2'
        value={password}
      />
      <div className='flex flex-row justify-between p-10'>
      <button onClick={handleSignUp} className='p-2 border b-1 rounded shadow text-nowrap'>Sign up</button>
      <button onClick={handleSignIn} className='p-2 border b-1 rounded shadow text-nowrap'>Sign in</button>
      </div>
    </div>
  )
}