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
        const response = await axios.get(url, {
            headers: {
                Authorization: "OTc4NjI0OTc5ODkxNTM1OTAz.MTcwMDIwMTAyNw--.3fc54432151",
            },
        });
        return response.data;
    }
    async function GetWaifu() {
        const uniqueNames = new Set(cNames);
        try {
            const promises = Array.from({ length: 20 }, async (_, i) => {
                let data;
                do {
                    data = await fetchWaifu();
                } while (uniqueNames.has(data.names.en));
                return data;
            });

            let results = await Promise.all(promises)
            results.forEach((data, i) => {
                setImgLinks((prev) => [...prev, data.images[0]]);
                setCNames((prev) => [...prev, data.names.en]);
                if (i === 19) {
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

    return (
        <>
            {
                loaded
                    ?
                    <section className="cards">
                        {Array.from({ length: 20 }, (_, i) => (
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