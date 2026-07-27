import Task from "./Task";
import UserCard from "./UserCard";

export default function Sidebar() {
    return (
        <aside className="
            flex h-dvh w-[min(350px,calc(100vw-3rem))] shrink-0
            bg-surface xl:w-87.5
            flex flex-col justify-between
            px-3.75 py-6.25 gap-5
        ">
            <div className="no-scrollbar flex min-h-0 max-h-220 flex-1 flex-col items-center gap-2.5 overflow-y-auto rounded-xl">
                <div className="w-full max-w-75 shrink-0 rounded-sm bg-now py-0.5 text-center text-[13px] text-text-primary">Hacer</div>
                <Task />
                <div className="w-full max-w-75 shrink-0 rounded-sm bg-plan py-0.5 text-center text-[13px] text-text-primary">Planificar</div>
                <div className="w-full max-w-75 shrink-0 rounded-sm bg-delegate py-0.5 text-center text-[13px] text-text-primary">Delegar</div>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <div className="w-full max-w-75 shrink-0 rounded-sm bg-delete py-0.5 text-center text-[13px] text-text-primary">Eliminar</div>
            </div>
            <UserCard />
        </aside>
    )
}
