import { createBrowserRouter, Navigate } from "react-router";

import { TasksListComponent } from "../components/listTasks/TasksListComponent";
import Login from "../components/account/Login";
import SignUp from "../components/account/SignUp";
import { AccountSettings } from "../components/account/AccountSettings";

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
    },
    {
        path: "/account",
        element: <AccountSettings />
    }
])