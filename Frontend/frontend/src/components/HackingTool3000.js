//import React from "react";
import React, { useRef, useEffect } from "react";
import "../App.css";
import DraggableWindow from "./draggableWindow.js";

/**
 *  Just the basic UI Window placeholder, will maybe be filled with content later
 * @param OnClose just determines the component thats called on in Desktop.js to close the tab
 *
 * @returns a draggable window that can be filled with content
 */
export default function HackingTool3000({ onClose }) {
    return (
            <DraggableWindow initialPosition={{ x: 400, y: 300 }} handleSelector=".title-bar">
        <div className="window"
             style={{
                 position: "absolute",
                 top: "30%",
                 left: "50%",
                 transform: "translate(-50%, -50%)"
            }}>

            <div className="title-bar">
                <div className="title-bar-text">Hackingtool 3000</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close" onClick={onClose}></button>
                </div>
            </div>


            <div className="window-body" style={{
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column"
            }}>
                {/* Matrix Regen Animation */}
                <MatrixRain/>
            </div>

        </div>

        </DraggableWindow>
    );

}

/**
 * React component for showing the matrix rain on the screen
 * Inspiration/source: https://www.youtube.com/watch?v=y4K_5CVz7Cs
 */

export function MatrixRain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current; // get Canvas Object
        const context = canvas.getContext('2d');

        // Größe setzen
        canvas.width = 400;
        canvas.height = 300;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        // Calculate how many can fit on the screen horizontially
        const rainDrops = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        function draw() {
            context.fillStyle = 'rgba(0, 0, 0, 0.05)'; // set black transparant overlay for each round
            context.fillRect(0, 0, canvas.width, canvas.height); // // Draw a transparant rectangle over the entire hackingtool window, so the previous frames fade slowly

            // green
            context.fillStyle = '#0F0';
            context.font = fontSize;

            // go through rainDrop array, draw characters for each column
            for (let i = 0; i < rainDrops.length; i++) {
                // Random letters from Alphabet and draw it on the screen (text, x, y). Multply necessary to get spacing
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                // if text crossed border, return to the top of the screen
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }

        const intervalId = setInterval(draw, 30);

        // Clean up beim Unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                background: "black",
                display: "block",
                margin: "auto",
                borderRadius: "8px"
            }}
        />
    );
}
