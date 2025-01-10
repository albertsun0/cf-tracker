import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.PUBLIC_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  const { userName } = await request.json()
  const {data: userData, error: userError} = await supabase.from('users').select('*').eq('cf_username', `${userName}`)
  console.log(userData)
  if (userData === null){
    const {error} = await supabase.from('users').insert({cf_username: `${userName}`})
  }
  const response = NextResponse.json({ message: 'Cookie set successfully!' })
  response.cookies.set('userName', userName)
  return response
}
