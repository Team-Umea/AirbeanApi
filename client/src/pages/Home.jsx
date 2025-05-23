import MaxWidthWrapper from "../components/utils/MaxWidthWrapper";
import coffeImg1 from "../assets/coffee-1.webp";
import coffeImg2 from "../assets/coffee-2.jpg";
import coffeImg3 from "../assets/coffee-3.jpg";
import coffeImg4 from "../assets/coffee-4.jpg";
import PrimaryButton from "../components/btn/PrimaryButton";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <MaxWidthWrapper classNameWrapper="mb-96">
      <div className="mx-auto w-[90%] max-w-xl flex flex-col justify-center items-center h-screen">
        <h2 className=" text-5xl text-center font-semibold">
          Väkommen till&nbsp;
          <span className="font-bold text-amber-600">Airbean Coffee</span>. Hitta ditt favorit kaffe
          idag!
        </h2>
        <p className="mt-12 text-lg text-center text-gray-800">
          Sök bland vårt stora utbud på kaffe och få det leverat hem till dörren med drönare inom 15
          minuter
        </p>
        <PrimaryButton className="w-fit mt-12" onClick={() => navigate("/meny")}>
          <span className="text-lg font-bold">Beställ nu</span>
          <ArrowRight />
        </PrimaryButton>
      </div>
      <div className="p-4 grid grid-rows-[repeat(4,1fr)] md:grid-cols-[repeat(2,1fr)] md:grid-rows-[repeat(2,1fr)] gap-8 md:gap-16">
        <img src={coffeImg1} alt="Kaffe" className="w-full h-full" />
        <img src={coffeImg2} alt="Kaffe" className="w-full h-full" />
        <img src={coffeImg3} alt="Kaffe" className="w-full h-full" />
        <img src={coffeImg4} alt="Kaffe" className="w-full h-full" />
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
