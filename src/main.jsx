import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { HomePage } from "./HomePage";
import { Task1 } from "./task1";
import { Task2 } from "./task2";
import { Task3 } from "./task3";
import { Header } from "./components/header";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/task1",
        element: <Task1 />,
    },
    {
        path: "/task2",
        element: <Task2 />,
    },
    {
        path: "/task3",
        element: <Task3 />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
