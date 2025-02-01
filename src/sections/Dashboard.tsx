import Menu from "./Menu";
import LogoIcon from "@/assets/MyLB.svg";

export const Dashboard = () => {
    return (
        <div className="h-screen flex">
            <div className="w-[16%] md:w-[8%] lg:w-[16%] xl:w-[14%] bd-red-200">
            <LogoIcon className="rounded-lg h-16 w-16 m-2"/>
            <Menu/>
            </div>
            <div className="w-[84%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-blue-900 overflow-scroll">
            </div>
        </div>
    )
}