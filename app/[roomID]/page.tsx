import React from "react";
import Ladder from "@/components/Ladder";
import { completion } from "@/components/ladderTypes";
import { createClient } from '@supabase/supabase-js'
import Room from "@/components/Room";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.PUBLIC_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function page({ params }: { params: { roomID: string } }) {
  const roomID = (await params).roomID
  const {data: roomData, error: roomError} = await supabase.from('rooms').select('*').eq('name', `${roomID}`)
  if (roomData === null || roomData.length === 0){
    console.log("hi")
  return (
    <main className="flex min-h-screen justify-center py-16">
      <div className="max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold">Create A Room</h1>
        <Room />
      </div>
    </main>
  );
  } else{
    const userName = "v101010"
    const room_ID = roomData[0].id
    const {data: userData, error: userError} = await supabase.from('users').select('*').eq('cf_username', `${userName}`)
    if (userData === null){
      
    } else{
      const user_ID = userData[0].id
      const {data: user_roomData, error: user_roomError} = await supabase.from('users_join_rooms').select('*').eq('user_id', `${user_ID}`)
      if (user_roomData === null){
        return (
          <main className="flex min-h-screen justify-center py-16">
            <div className="max-w-4xl space-y-8">
              <h1 className="text-4xl font-bold">Join Room?</h1>
              <Room />
            </div>
          </main>
        );

      } else{
        const userMap = new Map<number, string>();
        const {data: user_room1Data, error: user_room1Error} = await supabase.from('users_join_rooms').select('user_id').eq('room_id', `${room_ID}`)
        const items: number[] = user_room1Data.map(user => user.user_id)


        try {
          const { data, error } = await supabase
            .from('users')
            .select('user_id, cf_username')
            .in('user_id', items);
      
          if (error) {
            throw error;
          }
      
          data?.forEach(user => {
            userMap.set(user.user_id, user.cf_username);
          });
        } catch (err) {
          console.error('Error fetching data:', err);
        }
        return (
          <main className="flex min-h-screen justify-center py-16">
            <div className="max-w-4xl space-y-8">
              <h1 className="text-4xl font-bold">Room {roomID}</h1>
              <ul>
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </div>
          </main>
        );
      }
    }
    }
}

export default page;
