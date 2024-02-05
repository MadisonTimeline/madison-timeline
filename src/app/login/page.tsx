import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className='flex flex-col p-10 justify-center align-center'>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required className='border b-2'/>
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required className='border b-2'/>
      <button formAction={login} className='border b-2'>Log in</button>
      <button formAction={signup} className=' border b-2'>Sign up</button>
    </form>
  )
}