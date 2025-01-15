import React from "react";
import Ladder from "@/components/Ladder";
import { completion } from "@/components/ladderTypes";
import { createClient } from '@supabase/supabase-js'
import Room from "@/components/Room";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function page({ params }: { params: { roomID: string } }) {
  const roomID = (await params).roomID
  const {data: roomData, error: roomError} = await supabase.from('rooms').select('*').eq('name', `${roomID}`)
  if (roomData?.length === 0){
    return(
    <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-4xl font-bold mt-8 mb-4">Create Room</h1>
        <Room />
    </main>
    );
  }
  const cookieStore = await cookies();
  const userName = cookieStore.get('userName')?.value || '';
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('cf_username', `${userName}`);
  const userId = userData?.[0]?.id;
  const { data: room_user, error: submissionsError } = await supabase
    .from('user_join_rooms')
    .select('*')
    .eq('room_id', `${roomData?.[0]?.id}`)
    .eq('user_id', `${userId}`);
  
  if (room_user?.length === 0 || room_user === null) {
    await supabase.from('users_join_rooms').insert(
      { user_id: `${userId}`, room_id: `${roomData?.[0]?.id}` });
  }

  const { data: usersInRoom, error: usersInRoomError } = await supabase
    .from('users_join_rooms')
    .select('user_id')
    .eq('room_id', `${roomData?.[0]?.id}`);
  
  const userIds = usersInRoom?.map(user => user.user_id) || [];
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('cf_username')
    .in('id', userIds);
  
  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-4xl font-bold mt-8 mb-4">Room: {roomID}</h1>
      <ul>
        {users?.map((user, index) => (
          <li key={index}>{user.cf_username}</li>
        ))}
      </ul>
    </main>
  );


  
}

export default page;
