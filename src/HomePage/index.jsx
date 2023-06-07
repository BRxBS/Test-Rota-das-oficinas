import React from "react";
import "./style.scss";
import { GameController, Money, NumberOne, ArrowRight } from "phosphor-react";
import { Header } from "../components/header";

export function HomePage() {
    return (
        <>
            <Header />
            <div className="HomePage-container">
                <div className="HomePage-content">
                    <div className="text">
                        {" "}
                        <p>Teste de Programação</p>
                        <h2>Rota das Oficinas</h2>
                        <img src="/engrenagem.png" alt="" />
                    </div>
                    <div className="div-a">
                        <div className="container">
                            <div className="task1">
                                <a href={`/task1`}>Tarefa 1</a>
                                <br />
                                <div className="ArrowRight-container">
                                    <span>I</span>
                                    <ArrowRight size={32} color="#fffafa" />
                                    <span>1</span>
                                </div>
                            </div>
                            <div className="task2">
                                <a href={`/task2`}> Tarefa 2</a>
                                <br />
                                <GameController size={32} color="#fffafa" />
                            </div>

                            <div className="task3">
                                <a href={`/task3`}>Tarefa 3</a>
                                <br />
                                <Money size={32} color="#fffafa" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
