'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.PUBLIC_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
function Room() {
    const [name, setName] = useState<string>("");
    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
            event.preventDefault();
            if (name === "") return;
            const {data, error} = await supabase.from('rooms').insert({name: `${name}`})
            setName("");
        }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <input
                type="text"
                id="new-todo-input"
                placeholder="Enter Room Name"
                className="border border-gray-300 p-2 rounded w-full mb-2 text-black max-w-md"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-md">
                Set Room Name
            </button>

            
        </form>
    );
}
export default Room;