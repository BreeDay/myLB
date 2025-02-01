
import { signIn, signOut, auth } from "@/auth"

export const Button = () => {
    return (
        <form
        action={async () => {
            "use server"
            await signIn("google", {redirectTo: '/profile'});
        }}>
                    <button className="text-white border py-2 px-3 rounded-lg font-medium text-sm bg-blue-900 hover:bg-red-800 shadow-[0px_0px_12px_#8c45ff]">Lets Play Ball!</button>

        </form>
    )
}