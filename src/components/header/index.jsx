import { useState } from "react";
import { EnvelopeSimple, List, X } from "phosphor-react";

import "./style.scss";

export function Header() {
    return (
        <header>
            <a href="/">
                <h2>Home</h2>
            </a>

            <ul>
                <li>
                    {" "}
                    <a href={`/task1`}>Tarefa 1</a>{" "}
                </li>
                <li>
                    {" "}
                    <a href={`/task2`}> Tarefa 2</a>
                </li>
                <li>
                    {" "}
                    <a href={`/task3`}>Tarefa 3</a>{" "}
                </li>
            </ul>

            <div className="contact-wrapper">
                <EnvelopeSimple
                    size={32}
                    color="#fffafa"
                    className="svgEnvelope"
                />
                <a
                    target="blanck"
                    href="mailto:brunahta2025@hotmail.com?subject=Hello"
                >
                    <p>Fale Comigo.</p>
                </a>
            </div>
        </header>
    );
}
