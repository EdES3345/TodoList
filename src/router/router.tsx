import { createBrowserRouter } from "react-router";

import { TasksListComponent } from "../components/listTasks/TasksListComponent";

export const router = createBrowserRouter([
    {
    path: "/list",
    element: <TasksListComponent />
    }
])