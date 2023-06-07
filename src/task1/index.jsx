import { useState } from "react";
import { Header } from "../components/header";
import "./style.scss";
export function Task1() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const convertToArabic = () => {
        const romanNumerals = {
            I: 1,
            IV: 4,
            V: 5,
            IX: 9,
            X: 10,
            XL: 40,
            L: 50,
            XC: 90,
            C: 100,
            CD: 400,
            D: 500,
            CM: 900,
            M: 1000,
        };

        let result = 0;
        let i = 0;

        const sanitizedInput = input.trim().toUpperCase();

        while (i < sanitizedInput.length) {
            const currentSymbol = sanitizedInput[i];
            const nextSymbol = sanitizedInput[i + 1];

            if (
                nextSymbol &&
                romanNumerals[currentSymbol] < romanNumerals[nextSymbol]
            ) {
                result +=
                    romanNumerals[nextSymbol] - romanNumerals[currentSymbol];
                i += 2;
            } else {
                result += romanNumerals[currentSymbol];
                i++;
            }
        }

        setOutput(result.toString());
        setInput("");
    };

    const convertToRoman = () => {
        const arabicNumerals = [
            { value: 1000, numeral: "M" },
            { value: 900, numeral: "CM" },
            { value: 500, numeral: "D" },
            { value: 400, numeral: "CD" },
            { value: 100, numeral: "C" },
            { value: 90, numeral: "XC" },
            { value: 50, numeral: "L" },
            { value: 40, numeral: "XL" },
            { value: 10, numeral: "X" },
            { value: 9, numeral: "IX" },
            { value: 5, numeral: "V" },
            { value: 4, numeral: "IV" },
            { value: 1, numeral: "I" },
        ];

        let result = "";
        let num = parseInt(input, 10);

        for (let i = 0; i < arabicNumerals.length; i++) {
            while (num >= arabicNumerals[i].value) {
                result += arabicNumerals[i].numeral;
                num -= arabicNumerals[i].value;
            }
        }

        setOutput(result);
        setInput("");
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <>
            <Header />
            <div className="task1-container">
                <div className="task1-content">
                    <h2>Conversor</h2>
                    <div className="input-number">
                        <label htmlFor="input">Número:</label>
                        <input
                            type="text"
                            id="input"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="buttons">
                        <button
                            className="buttons-arab"
                            onClick={convertToArabic}
                        >
                            Converter para Arábico
                        </button>
                        <button
                            className="buttons-rom"
                            onClick={convertToRoman}
                        >
                            Converter para Romano
                        </button>
                    </div>
                    <div className="div-output">
                        <label htmlFor="output">Resultado:</label>
                        <input
                            type="text"
                            id="output"
                            value={output}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
