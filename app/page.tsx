import CardCustomComponent from "./components/card/card";
import { GoGraph, GoPeople, GoProject } from "react-icons/go";

export default function Home() {
  return (
    <div>
      <div className="font-sans border-b-1 px-6 py-4">
        <h1 className="text-[24px] font-bold">Panel administrativo</h1>
        <p>Panel de control del sistema</p>
      </div>
      <div className="max-w-[1200px] grid grid-cols-[1fr_1fr_1fr] px-6 py-4 justify-items-center gap-10 m-auto">
        <CardCustomComponent icon={<GoGraph size={24} color="green"/>} service="Ingresos y gastos" data={'Gestion Financiera'} route={"finance"} />
        <CardCustomComponent icon={<GoPeople size={24} color="blue"/>} service="Gestion de accesos" data={'Usuarios'} route={"users"} />
        <CardCustomComponent icon={<GoProject size={24} color="purple"/> } service="Revisar informes" data={'Reportes'} route={"reports"} />
      </div>
    </div>
  );
}
