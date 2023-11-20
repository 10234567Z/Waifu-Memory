export default function ScoreCard({ currentscore , highest}){
    return (
        <section className="scoreCard">
            <div className="currentScore">
                <h4>Score: {currentscore}</h4>
            </div>
            <div className="highestScore">
                <h4>Highest: {highest}</h4>
            </div>
        </section>
    )
}