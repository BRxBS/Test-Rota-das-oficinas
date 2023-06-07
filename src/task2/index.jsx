import React, { useState, useEffect } from "react";
import { Header } from "../components/header";
import "./style.scss";

export function Task2() {
    const rows = 10;
    const cols = 10;

    const [grid, setGrid] = useState([]);

    useEffect(() => {
        initializeGrid();
    }, []);

    const initializeGrid = () => {
        const initialGrid = Array(rows)
            .fill()
            .map(() => Array(cols).fill(false));
        setGrid(initialGrid);
    };

    const toggleCell = (row, col) => {
        const updatedGrid = [...grid];
        updatedGrid[row][col] = !updatedGrid[row][col];
        setGrid(updatedGrid);
    };

    const calculateNextGeneration = () => {
        const updatedGrid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const aliveNeighbors = countAliveNeighbors(rowIndex, colIndex);

                if (cell && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                    return false; // Any live cell with fewer than two or more than three live neighbors dies
                } else if (!cell && aliveNeighbors === 3) {
                    return true; // Any dead cell with exactly three live neighbors becomes a live cell
                } else {
                    return cell; // Any other cell remains unchanged
                }
            })
        );

        setGrid(updatedGrid);
    };

    const countAliveNeighbors = (row, col) => {
        let count = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;

                const neighborRow = row + i;
                const neighborCol = col + j;

                if (
                    neighborRow >= 0 &&
                    neighborRow < rows &&
                    neighborCol >= 0 &&
                    neighborCol < cols
                ) {
                    count += grid[neighborRow][neighborCol] ? 1 : 0;
                }
            }
        }

        return count;
    };

    return (
        <>
            <Header />

            <div className="container">
                <div className="content">
                    <h2>Jogo da Vida de Conway</h2>
                    <div className="grid">
                        {grid.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`cell ${
                                        cell ? "alive" : "dead"
                                    }`}
                                    onClick={() =>
                                        toggleCell(rowIndex, colIndex)
                                    }
                                />
                            ))
                        )}
                    </div>
                    <div className="buttons">
                        <button
                            className="next-generation"
                            onClick={calculateNextGeneration}
                        >
                            Próxima Geração
                        </button>
                        <button className="reset" onClick={initializeGrid}>
                            Reiniciar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
