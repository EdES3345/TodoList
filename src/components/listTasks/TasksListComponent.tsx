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
        if(localStorage.getItem("session_id_setup") !== "true") {
            navigate("/login")
        }
        getTasks()
    }, [])
    
    const [tasksListState, setTasksListState] = useState<TaskType[]>([]);
    const [inputAddTask, setInputAddTask] = useState("");
    const [errorServer, setErrorServer] = useState(false);

    const getTasks = async () => 
         { await fetch("http://localhost:5174/api/users/tasks", {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type" : "application/json"},
        }).then(async (res) => {
            if(res.status === 401) {
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

    useEffect(() => {
        if(sendTask.current === true) {
        fetch("http://localhost:5174/api/users/tasks", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(tasksListState)
        }).then((res) => {
            if(res.status === 401) {
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
        {!errorServer ? <section className="w-full flex flex-col items-center">
            <div className="w-200 flex gap-2 justify-center pb-7 border-b border-gray-400">
                <InputText type="text" className="box-border w-5/6 h-10 p-2" value={inputAddTask} onChange={(e) => setInputAddTask(e.target.value)} placeholder="Entrez le nom de la tâche à ajouter"/>
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