import { Button } from "@/components/Button"
import  Baseball  from "@/assets/baseball.svg"
export const Hero = () => {
  return <section className="h-[492px] flex items-center bg-blue-800">
    <Baseball className="absolute h-64 w-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3"/>
    <div className="container text-center relative">
      <h1 className="lg:text-8xl sm:text-6xl font-semibold p-4 tracking-tighter bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(255,255,255,.5))] drop-shadow-xl text-transparent bg-clip-text">My League Baseball</h1>
      <p className="[text-shadow:_0_4px_8px_#000000] text-lg text-white drop-shadow-md my-5">Using the Latest AI Tech to Elevate your Baseball Experience</p>
      <div className="flex justify-center mt-5">
      <Button/>
      </div>
    </div>
  </section>;
};
