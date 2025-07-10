import React, { useState, useEffect } from "react";
import "../App.css";


// comparing guess and correct word
function getFeedback(guess, word) {
    const feedback = Array(5).fill("absent");
    const wordChars = word.split("");
    const guessChars = guess.split("");
    const usedIndices = [];

    // 1. Marking green letters (right spot)
    for (let i = 0; i < 5; i++) {
        if (guessChars[i] === wordChars[i]) {
            feedback[i] = "correct";
            usedIndices.push(i);
        }
    }

    // 2. count the other remaining letters that are not in the right spot
    const remainingChars = {};
    for (let i = 0; i < 5; i++) {
        if (!usedIndices.includes(i)) {
            const char = wordChars[i];
            remainingChars[char] = (remainingChars[char] || 0) + 1;
        }
    }

    // 3. Fixing multiple letters being marked as yellow even if there is only one of that letter in the word
    for (let i = 0; i < 5; i++) {
        if (feedback[i] === "correct") continue;
        const char = guessChars[i];
        if (remainingChars[char]) {
            feedback[i] = "present";
            remainingChars[char]--;
        }
    }

    return feedback;
}

const MAX_GUESSES = 6;

export default function WordleGame({ onExit }) {
    const [wordList, setWordList] = useState([]);
    const [targetWord, setTargetWord] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);
    const [hasGivenUp, setHasGivenUp] = useState(false); // forfeited

    // loading word list
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/tabatkins/wordle-list/main/words")
            .then(res => res.text())
            .then(text => {
                const words = text.split("\n").filter(w => w.length === 5);
                setWordList(words);

                // pick a random word to start
                const randomIndex = Math.floor(Math.random() * words.length);
                setTargetWord(words[randomIndex]);
            })
            .catch(err => {
                console.error("Error loading word pool:", err);
                setMessage("Unable to load word pool.");
            });
    }, []);

    // handling the guess
    const handleGuess = () => {
        if (isGameOver) return;

        if (input.length !== 5 || !wordList.includes(input)) {
            setMessage("Word could not be found");
            return;
        }

        const newGuesses = [...guesses, input];
        setGuesses(newGuesses);
        setInput("");
        setMessage("");

        if (input === targetWord || newGuesses.length === MAX_GUESSES) {
            setIsGameOver(true);
        }
    };

    // Start New game with new random word
    const startNewGame = () => {
        const newIndex = Math.floor(Math.random() * wordList.length);
        setTargetWord(wordList[newIndex]);
        setGuesses([]);
        setInput("");
        setMessage("");
        setIsGameOver(false);
        setHasGivenUp(false);
    };

    // give up function
    const handleGiveUp = () => {
        setIsGameOver(true);
        setHasGivenUp(true);
    };

    return (
        <div style={{ padding: "12px", fontFamily: "'Pixelated MS Sans Serif', Arial", textAlign: "center" }}>
            <h3>Wordle</h3>

            {/* Give up + Go Back to Gamecenter button */}
            {!isGameOver && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <button
                        onClick={onExit}
                        style={{
                            padding: "6px 12px",
                            fontSize: "14px",
                            backgroundColor: "#888",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Go Back
                    </button>

                    <button
                        onClick={handleGiveUp}
                        style={{
                            padding: "6px 12px",
                            fontSize: "14px",
                            backgroundColor: "#cc0000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                    Give Up
                    </button>
                </div>
            )}

            {/* 5x6 grid for guesses */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                {[...Array(MAX_GUESSES)].map((_, rowIndex) => {
                    const guess = guesses[rowIndex] || "";
                    const feedback = guess ? getFeedback(guess, targetWord) : [];

                    return (
                        <div key={rowIndex} style={{ display: "flex", gap: "5px" }}>
                            {Array.from({ length: 5 }).map((_, letterIndex) => {
                                const char = guess[letterIndex] || "";
                                const bgColor = feedback[letterIndex] === "correct"
                                    ? "green"
                                    : feedback[letterIndex] === "present"
                                        ? "gold"
                                        : guess ? "gray" : "#ddd";

                                return (
                                    <span
                                        key={letterIndex}
                                        style={{
                                            width: "35px",
                                            height: "35px",
                                            lineHeight: "35px",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            border: "1px solid #333",
                                            backgroundColor: bgColor,
                                            color: "#fff",
                                            textTransform: "uppercase"
                                        }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* Input for the Word */}
            {!isGameOver && guesses.length < MAX_GUESSES && (
                <input
                    type="text"
                    maxLength={5}
                    value={input}
                    onChange={(e) => setInput(e.target.value.toLowerCase())}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleGuess();
                        }
                    }}
                    style={{ marginTop: "20px", width: "120px" }}
                />
            )}

            
            {message && <div style={{ marginTop: "10px", color: "red" }}>{message}</div>}

            {/* Restart button & end */}
            {isGameOver && (
                <>
                    {hasGivenUp
                        ? <div style={{ marginTop: "10px", color: "red" }}>You gave up. The word was: <strong>{targetWord.toUpperCase()}</strong></div>
                        : guesses.includes(targetWord)
                            ? <div style={{ marginTop: "10px", color: "green" }}>Congrats!</div>
                            : <div style={{ marginTop: "10px", color: "crimson" }}>You lost. The word was: <strong>{targetWord.toUpperCase()}</strong></div>
                    }

                    <button
                        onClick={startNewGame}
                        style={{
                            marginTop: "15px",
                            padding: "8px 16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            borderRadius: "5px",
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            border: "none"
                        }}
                    >
                        New game
                    </button>
                </>
            )}
        </div>
    );
}