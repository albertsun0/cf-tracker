import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  const { userName } = await request.json()
  const {data: userData, error: userError} = await supabase.from('users').select('*').eq('cf_username', `${userName}`)
  if (userData === null){
    const {error} = await supabase.from('users').insert({cf_username: `${userName}`})
  }
  const response = NextResponse.json({ message: 'Cookie set successfully!' })
  response.cookies.set('userName', userName)
  return response
}
