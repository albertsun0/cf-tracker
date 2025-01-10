'use server'
import {cookies} from 'next/headers';
import { redirect } from 'next/navigation'


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const userName = (await searchParams).userName as string;
    const cookieStore = await cookies()
    cookieStore.set('userName', userName)
    redirect("/")
}