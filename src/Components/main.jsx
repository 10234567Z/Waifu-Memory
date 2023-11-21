import { useState, useTransition } from "react";
import "../Styles/main.css"
import Collection from "./Main Components/collection";

export default function Main() {
    const [score, setScore] = useState(0)
    const [highest, setHighest] = useState(0)
    return (
        <main>
            <section className="scoreCard">
                <div className="currentScore">
                    <h4>Score: {score}</h4>
                </div>
                <div className="highestScore">
                    <h4>Highest: {highest}/16</h4>
                </div>
            </section>
            <Collection
                onScoreUpdate={() => setScore(score + 1)}
                putHighest={() => {
                    if (score >= highest) { 
                        setHighest(highest + 1) 
                    }
                }
                }
                reset={() => setScore(0)}></Collection>
        </main>
    )
}