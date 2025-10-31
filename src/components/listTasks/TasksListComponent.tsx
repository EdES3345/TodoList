import { useState } from "react"

import type { TaskType } from "../../types/TaskType";
import { TaskComponent } from "./TaskComponent";
import { Button } from "../littleComponents/Button";
import { InputText } from "../littleComponents/InputText";

export function TasksListComponent() {
    const [tasksListState, setTasksListState] = useState<TaskType[]>([]);
    const [inputAddTask, setInputAddTask] = useState("");

    const handleAddTask = () => {
        setTasksListState([...tasksListState, {
            name: inputAddTask,
            checkState: false,
            id: Date.now()
        }])
        setInputAddTask("");
    }

    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-200 flex gap-2 justify-center pb-7 border-b border-gray-400">
                <InputText type="text" className="box-border w-5/6 h-10 p-2" value={inputAddTask} onChange={(e) => setInputAddTask(e.target.value)} placeholder="Entrez le nom de la tâche à ajouter"/>
                <Button className="box-border w-1/6 h-10" onClick={handleAddTask}>Ajouter</Button>
            </div>
            <ul className="p-0 w-200 flex flex-col gap-4 mt-7 items-center">
                {tasksListState.length !== 0 ?
                    tasksListState.map((task) => {
                        return <TaskComponent key={task.id} task={task} taskList={tasksListState} setTasksList={setTasksListState} />
                    }) 
                    : <p>Aucune tâche dans la base de données</p> }
            </ul>
        </section>
    )
}