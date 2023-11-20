import { useEffect, useState } from "react";
import axios from "axios";
import loading from "./Assets/loading.gif"

export default function Cards() {
    const [clicked, setClicked] = useState(false)
    const [selected, setSelected] = useState([])
    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [imgLinks, setImgLinks] = useState([])
    const [cNames, setCNames] = useState([])
    const [progress, setProgress] = useState(0)
    const url = "https://waifu.it/api/waifu";

    async function fetchWaifu() {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: "OTc4NjI0OTc5ODkxNTM1OTAz.MTcwMDIwMTAyNw--.3fc54432151",
                },
            });
            if (response.status === 429) {
                location.reload();
            }

            return response.data;
        }
        catch (err) {
            if(err.response.status === 429){
                location.reload()
            }
            throw new Error(err.message)
        }
    }
    async function GetWaifu() {
        const uniqueNames = new Set(cNames);
        try {
            const promises = Array.from({ length: 16 }, async (_, i) => {
                let data;
                do {
                    data = await fetchWaifu();
                } while (uniqueNames.has(data.names.en));
                return data;
            });

            let results = await Promise.all(promises)
            results.forEach((data, i) => {
                let rand = -1;
                do {
                    rand++
                } while (data.images[rand].includes("thicc.mywaifulist") && rand < data.images.lengths);
                setImgLinks((prev) => [...prev, data.images[rand]]);
                setCNames((prev) => [...prev, data.names.en]);
                if (i === 15) {
                    setLoaded(true)
                }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    useEffect(() => {
        GetWaifu()
    }, [])

    let randIndex = []
    for (let i = 0; i < 4; i++) {
        let rand;
        do {
            rand = Math.floor(Math.random() * 16)
        } while (randIndex.includes(rand))
        randIndex.push(rand)
    }

    console.log(randIndex)

    return (
        <>
            {
                loaded
                    ?
                    <section className="cards">
                        {Array.from({ length: 16 }, (_, i) => (
                            <div className="card" key={i}>
                                <div className="image">
                                    <img src={imgLinks[i]} alt="cardImage" width="200px" height="200px"></img>
                                </div>
                                <h3>{cNames[i]}</h3>
                            </div>
                        ))}
                    </section>
                    :
                    <>
                        <h2>Loading Your Waifies....</h2>
                        <img src={loading} height='500px' width='500px' alt="loading.."></img>
                    </>
            }
        </>
    )


}