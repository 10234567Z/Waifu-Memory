import { useState } from "react";
import ScoreCard from "./Main Components/ScoreCard";
import "../Styles/main.css"
import Collection from "./Main Components/collection";

export default function Main(){
    const [score , setScore] = useState(0)
    let highest = score + 0;
    return (
        <main>
            <ScoreCard currentscore={score} highest={highest}></ScoreCard>
            <Collection></Collection>
        </main>
    )
}