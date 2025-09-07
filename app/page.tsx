import Image from "next/image";
import Navbar from "./components/navbar/navbar";
import Card from "./components/card/card";
import { GoGraph, GoPeople, GoProject, GoRepo } from "react-icons/go";

export default function Home() {
  return (
    <div>
      <div className="font-sans border-b-1 px-6 py-4">
        <h1 className="text-[24px] font-bold">Panel administrativo</h1>
        <p>Panel de control del sistema</p>
      </div>
      <div className="max-w-[1200px] grid grid-cols-[1fr_1fr_1fr] px-6 py-4 justify-items-center gap-10 m-auto">
        <Card icon={<GoGraph size={24} color="green"/>} service="Gestion Financiera" data={'$200K'} route={"finance"} />
        <Card icon={<GoPeople size={24} color="blue"/>} service="Gestion de personal" data={'32'} route={"users"} />
        <Card icon={<GoProject size={24} color="purple"/> } service="Reportes" data={'128'} route={"reports"} />
      </div>
    </div>
  );
}
