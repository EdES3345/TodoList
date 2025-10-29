import { useEffect, useState } from "react"

import type { TaskType } from "../../types/TaskType"

type propsType = {
    task: TaskType;
    taskList: TaskType[];
    setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export function TaskComponent({task, taskList, setTasksList}: propsType) {

    const [checkState, setCheckState] = useState(task.checkState);
    const [name, setName] = useState(task.name);

    useEffect(() => {
        setTasksList(
            taskList.map((taskMap) => {
                if (taskMap.id == task.id) {
                    return { ...taskMap, name: name };
                }
                return taskMap;
            })
        )
    }, [name])

    useEffect(() => {
        setTasksList(
            taskList.map((taskMap) => {
                if (taskMap.id == task.id) {
                    return { ...taskMap, checkState: checkState };
                }
                return taskMap;
            })
        )
    }, [checkState])

    const deleteTask = () => {
        setTasksList(
            taskList.filter((taskMap) => {
                if (taskMap.id === task.id) {
                    return false;
                }
                return true;
            })
        )
    }

    return (
        <li>
            <input type="checkbox" checked={checkState} onChange={() => setCheckState(!checkState)} />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={deleteTask}>X</button>
        </li>
    )
}