import { useEffect, useState } from "react";
import axios from "axios";
import loading from "./Assets/loading.gif"
import { Progress } from "rsup-progress";

export default function Cards({ onScoreUpdate, putHighest, reset }) {
    const [loaded, setLoaded] = useState(false)
    const [imgLinks, setImgLinks] = useState([])
    const [cNames, setCNames] = useState([])
    const [started, setStarted] = useState(false)
    const [reloaded , setReloaded] = useState(false)

    useEffect(() => {
        const progress = new Progress({
            height: 5,
            color: '#BEADFA',
        })
        const fetchWaifu = async () => {
            try {
                const response = await axios.get("https://waifuserv.onrender.com/end/16")
                return response.data;
            }
            catch (err) {
                throw new Error(err.message)
            }
        }

        const GetWaifu = async () => {
            let copyC = []
            let copyI = []
            try {
                progress.start()
                const results = await fetchWaifu();
                results.forEach((data) => {
                    copyC.push({ name: data.name, selected: false })
                    copyI.push(data.url)
                    setImgLinks(copyI);
                    setCNames(copyC);
                });
                setLoaded(true)
                console.log(copyC , copyI)
                progress.end()
            } catch (err) {
                throw new Error(err.message);
            }
        }

        const LoadWaifuData = async () => {
            if (localStorage.getItem("Character Names") == null) {
                await GetWaifu()
            }
            else {
                setCNames(JSON.parse(localStorage.getItem("Character Names")));
                setImgLinks(JSON.parse(localStorage.getItem("image links")));
                setLoaded(true)
            }
        }
        LoadWaifuData();
    }, [reloaded])

    let randIndex = []
    for (let i = 0; i < 16; i++) {
        let rand = Math.floor(Math.random() * 16)
        while (randIndex.includes(rand)) {
            rand = Math.floor(Math.random() * 16)
        }
        randIndex.push(rand)
    }

    const reload = () => {
        localStorage.clear()
        setCNames([])
        setImgLinks([])
        setReloaded(!reloaded)
        setLoaded(false)
        setStarted(false)
    }

    const save = (e) => {
        localStorage.setItem('Character Names', JSON.stringify(cNames))
        localStorage.setItem('image links', JSON.stringify(imgLinks))
        setStarted(true)
    }


    const bRad = (i) => {
        if (i % 2 == 0) {
            return "0 10px 0 10px"
        }
        else {
            return "10px 0 10px 0"
        }
    }


    return (
        <>
            {
                loaded
                    ?
                    <>
                        <section className="cards">
                            {randIndex.map((i, j) => (
                                <button className="card" key={i}
                                    onClick={(e) => {
                                        let copyC = cNames.slice()
                                        if (copyC[i].selected === false) {
                                            copyC[i].selected = true;
                                            setCNames(copyC)
                                            setStarted(true)
                                            onScoreUpdate()
                                            putHighest()
                                        }
                                        else {
                                            for (let i = 0; i < copyC.length; i++) {
                                                copyC[i].selected = false;
                                            }
                                            setCNames(copyC)
                                            setStarted(false)
                                            reset()
                                        }
                                    }}
                                    style={{ borderRadius: bRad(j) }}>
                                    <div className="image">
                                        <img src={imgLinks[i]} alt="cardImage" width="250px" height="250px"></img>
                                    </div>
                                    <h3>{cNames[i].name}</h3>
                                </button>
                            ))}

                        </section>
                        <div className="controls">
                            <button onClick={reload}>Reload Waifus</button>
                            {localStorage.getItem("Character Names") == null && !started && <button onClick={save}>Save Loaded Collection</button>}
                        </div>
                    </>
                    :
                    <>
                        <img src={loading} height='500px' width='500px' alt="loading.."></img>
                    </>
            }
        </>
    )


}