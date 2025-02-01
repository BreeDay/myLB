import { signIn, signOut, auth } from "@/auth"

export default async function SignIn() {
    const session = await auth();
    const user = session?.user

    return user ?
    (
        <>
        <h1 className="text-2xl">Lets Play Ball {user.name}</h1>
        <form
        action={async () => {
            "use server"
            await signOut();
        }}>
                    <button className="text-white border py-2 px-3 rounded-lg font-medium text-sm hover:bg-blue-900 bg-red-800 shadow-[0px_0px_12px_#8c45ff]">Leave Game</button>

        </form>
        </>
    )
    :
    (
        <>
            <h1 className="You are not authenticated. Click the button below to play along."></h1>
            <form
        action={async () => {
            "use server"
            await signIn("google", {redirectTo: '/secret'});
        }}>
                    <button className="text-white border py-2 px-3 rounded-lg font-medium text-sm bg-blue-900 hover:bg-red-800 shadow-[0px_0px_12px_#8c45ff]">Lets Play Ball</button>

        </form>
        </>
    )
}