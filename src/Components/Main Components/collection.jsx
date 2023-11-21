import Cards from "./cards"
export default function Collection( {onScoreUpdate, putHighest , reset}){
    return (
        <section className="collection">
            <Cards onScoreUpdate={onScoreUpdate} putHighest={putHighest} reset={reset}></Cards>
        </section>
    )
}