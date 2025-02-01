import LogoIcon from "@/assets/MyLB.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import { Button } from "@/components/Button";

export const Header = () => {
  return (
  <header className="pt-4 border-b border-white/15 bg-blue-800 md:border-none sticky top-0 z-10 backdrop-blur">
    <div className="container">
      <div className="flex justify-between w-full items-center md:border-b border-white/15 md:p-2.5 rounded-xl backdrop-blur">
        <div>
          <div className="h-16 w-16 inline-flex justify-left items-left border-none">
            <LogoIcon className="rounded-lg h-16 w-24"/>
          </div>
        </div>
        <div className="hidden md:block">
          <nav className="flex gap-8 text-sm">
            <a href="#" className="text-white/70 hover:text-white transition">About</a>
            <a href="#" className="text-white/70 hover:text-white transition">How It Works</a>
            <a href="#" className="text-white/70 hover:text-white transition">Technical Implementation</a>
            <a className="flex gap-4 items-center text-white">
          <Button/>
        </a>
          </nav>   
        </div>
        <MenuIcon className="md:hidden"/>
      </div>
    </div>
  </header>
  );
};
