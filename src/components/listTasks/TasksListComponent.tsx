import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import type { TaskType } from "../../types/TaskType";
import { TaskComponent } from "./TaskComponent";
import { Button } from "../littleComponents/Button";
import { InputText } from "../littleComponents/InputText";
import { InformationBox } from "../littleComponents/InformationBox";


export function TasksListComponent() {
    const navigate = useNavigate();
    const sendTask = useRef(false);

    useEffect(() => {
        if (localStorage.getItem("session_id_setup") !== "true") {
            navigate("/login")
        }
        getTasks()
    }, [])

    const [tasksListState, setTasksListState] = useState<TaskType[]>([]);
    const [inputAddTask, setInputAddTask] = useState("");
    const [errorServer, setErrorServer] = useState(false);

    const getTasks = async () => {
        await fetch("/api/users/tasks", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }).then(async (res) => {
            if (res.status === 401) {
                localStorage.setItem("session_id_setup", "false")
                navigate("/login")
            } else {
                const jsonList = await res.json();
                setTasksListState(jsonList);
                sendTask.current = true;
            }
        }).catch(() => {
            setErrorServer(true);
        })
    }

    const disconnect = async () => {
        await fetch("api/users/session", {
            method: "DELETE",
            credentials: "include"
        }).then(async () => {
            localStorage.setItem("session_id_setup", "false")
            navigate("/login")
        })
    }           

    useEffect(() => {
        if (sendTask.current === true) {
            fetch("/api/users/tasks", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tasksListState)
            }).then((res) => {
                if (res.status === 401) {
                    localStorage.setItem("session_id_setup", "false")
                    navigate("/login")
                }
            }).catch(() => {
                setErrorServer(true);
            })
        }
    }, [tasksListState])



    const handleAddTask = () => {
        setTasksListState([...tasksListState, {
            name: inputAddTask,
            checkState: false,
            id: Date.now()
        }])
        setInputAddTask("");
    }

    return (<>
        <nav className="flex place-content-between items-center border-b mb-10 border-gray-400 px-5">
            <h1>TodoList</h1>
            <div className="flex gap-2">
                {/* <Link to="/account"><Button className="px-3 h-10">Mon compte</Button></Link> */}
                <Button className="px-3 h-10 bg-red-500 hover:bg-red-500" onClick={disconnect}>Deconnexion</Button>
            </div>
        </nav>
        {!errorServer ? <section className="w-full flex flex-col items-center">
            <div className="w-200 flex gap-2 justify-center pb-7 border-b border-gray-400">
                <InputText type="text" className="box-border w-5/6 h-10 p-2" value={inputAddTask} onChange={(e) => setInputAddTask(e.target.value)} placeholder="Entrez le nom de la tâche à ajouter" />
                <Button className="box-border w-1/6 h-10" onClick={handleAddTask}>Ajouter</Button>
            </div>
            <ul className="p-0 w-200 flex flex-col gap-4 mt-7 items-center">
                {tasksListState.length !== 0 ?
                    tasksListState.map((task) => {
                        return <TaskComponent key={task.id} task={task} taskList={tasksListState} setTasksList={setTasksListState} />
                    })
                    : <p>Aucune tâche dans la base de données</p>}
            </ul></section>
            : <InformationBox styleBox="error">Erreur Serveur. Rechargez la page pour réessayer.</InformationBox>}
    </>)
}