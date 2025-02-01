import { signIn, signOut, auth } from "@/auth"
import { Dashboard } from "@/sections/Dashboard"
import { Header } from "@/sections/Header";

export default async function SignIn() {
    const session = await auth();
    console.log(session)
    const user = session?.user

    return user ?
    (
        <div className="">
        <Dashboard/>
        <form
        action={async () => {
            "use server"
            await signOut();
        }}> 
                    
                    <div className="absolute top-5 right-5">
                    <h1 className="text-white text-xl  mb-5">{user.name}</h1>
                    <button className="text-white border py-2 px-3 rounded-lg font-medium text-sm hover:bg-blue-900 bg-red-800 shadow-[0px_0px_12px_#8c45ff]">Leave Game</button>
                    </div>
        </form>
        </div>
    )
    :
    (
        <div className="h-[492px] flex items-center bg-blue-800">
            <h1 className="You are not authenticated. Click the button below to play along."></h1>
            <form
        action={async () => {
            "use server"
            await signIn("google");
        }}>
                    <button className="text-white border py-2 px-3 rounded-lg font-medium text-sm bg-blue-900 hover:bg-red-800 shadow-[0px_0px_12px_#8c45ff]">Lets Play Ball</button>

        </form>
        </div>
    )
}