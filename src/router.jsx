import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Task1 } from "./task1";
import { Task2 } from "./task2";
import { Task3 } from "./task3";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/task1" element={<Task1 />} />
            <Route path="/task2" element={<Task2 />} />
            <Route path="/task3" element={<Task3 />} />
        </Routes>
    );
}
