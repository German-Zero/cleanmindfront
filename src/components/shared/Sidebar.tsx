import Task from "./Task";
import UserCard from "./UserCard";

export default function Sidebar() {
    return (
        <div className="
            w-87.5 min-h-screen bg-surface 
            flex flex-col justify-between
            px-3.75 py-6.25 gap-5
        ">
            <div className="h-220 rounded-xl flex flex-col gap-2.5 items-center overflow-y-auto no-scrollbar">
                <div className="w-75 py-0.5 bg-now rounded-sm text-text-primary text-[13px] text-center">Hacer</div>
                <Task />
                <div className="w-75 py-0.5 bg-plan rounded-sm text-text-primary text-[13px] text-center">Planificar</div>
                <div className="w-75 py-0.5 bg-delegate rounded-sm text-text-primary text-[13px] text-center">Delegar</div>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <div className="w-75 py-0.5 bg-delete rounded-sm text-text-primary text-[13px] text-center">Eliminar</div>
            </div>
            <UserCard />
        </div>
    )
}