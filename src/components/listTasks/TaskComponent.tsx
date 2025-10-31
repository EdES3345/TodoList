import { useEffect, useState } from "react"

import type { TaskType } from "../../types/TaskType";
import { InputCheckbox } from "../littleComponents/InputCheckbox";
import { InputText } from "../littleComponents/InputText";
import { Button } from "../littleComponents/Button";

type PropsType = {
    task: TaskType;
    taskList: TaskType[];
    setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export function TaskComponent({task, taskList, setTasksList}: PropsType) {

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

    const handleDeleteTask = () => {
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
        <li className="flex items-center *:justify-center list-none w-full border-solid border-2 border-gray-400 rounded-xl box-border px-3 py-4  gap-5">
            <InputCheckbox checked={checkState} onChange={() => setCheckState(!checkState)} className="box-border m-0 size-7"/>
            <InputText type="text" value={name} onChange={(e) => setName(e.target.value)} className=" w-9/12 box-border h-10"/>
            <Button onClick={handleDeleteTask} className="w-2/12 h-10">Supprimer</Button>
        </li>
    )
}