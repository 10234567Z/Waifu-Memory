import { useState } from "react"
import "../Styles/Header.css"
import Audio from '../assets/background.mp3'
import MusicPIC from '../assets/music.svg'

export default function Header() {
    const [play, setPlay] = useState(false)
    return (
        <header>
            {
                play &&
                <audio autoPlay hidden loop>
                    <source src={Audio}></source>
                </audio>
            }
            <button className="musicC" onClick={() => setPlay(!play)}>
                <img src={MusicPIC} width="50px" height="50px" className='musicPIC'></img>
            </button>
            <h1>Waifu Memories</h1>
            <i>
                <h3>Let's test how well you remember your waifus</h3>
            </i>
        </header>
    )
}