import { createBrowserRouter, Navigate } from "react-router";

import { TasksListComponent } from "../components/listTasks/TasksListComponent";
import Login from "../components/access/Login";
import SignUp from "../components/access/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/list" replace />
    },
    {
        path: "/list",
        element: <TasksListComponent />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    }
])