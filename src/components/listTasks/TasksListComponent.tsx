import { useState } from "react"

import type { TaskType } from "../../types/TaskType";
import { TaskComponent } from "./TaskComponent";

export function TasksListComponent() {
    const [tasksListState, setTasksListState] = useState<TaskType[]>([]);
    const [inputAddTask, setInputAddTask] = useState("");

    const addTask = () => {
        setTasksListState([...tasksListState, {
            name: inputAddTask,
            checkState: false,
            id: Date.now()
        }])
        setInputAddTask("");
        
    }

    return (<>
        <div>
            <input type="text" value={inputAddTask} onChange={(e) => setInputAddTask(e.target.value)} />
            <button onClick={addTask}>Ajouter</button>
        </div>
        <ul>
            {tasksListState.map((task) => {
                return <TaskComponent key={task.id} task={task} taskList={tasksListState} setTasksList={setTasksListState} />
            })}
        </ul>
    </>)
}