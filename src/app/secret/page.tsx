import { auth } from "@/auth"
import { redirect } from 'next/navigation'

export default async function Secret() {
    const session = await auth();
    if(!session) return redirect('/profile')

    return <h1 className="text-2xl text-blue-800">Let The Games Begin!</h1>
}