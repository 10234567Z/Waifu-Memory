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
    async function GetWaifu() {
        try {
            for (let i = 0; i < 30; i++) {
                const { data } = await axios.get(url, {
                    headers: {
                        Authorization: "OTc4NjI0OTc5ODkxNTM1OTAz.MTcwMDIwMTAyNw--.3fc54432151",
                    },
                });

                if(cNames.includes(data.names.en)){
                    i--;
                }
                else{
                    setImgLinks((prev) => [...prev, data.images[0]]);
                    setCNames((prev) => [...prev, data.names.en]);
                    if (i === 29) {
                        setLoaded(true);
                    }
                    setProgress(i + 1)
                    await new Promise((resolve) => setTimeout(resolve, 500));
                }
            }
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
                        {Array.from({ length: 30 }, (_, i) => (
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
                        <progress value={progress} max="30" ></progress>
                        <img src={loading} height='500px' width='500px' alt="loading.."></img>
                    </>
            }
        </>
    )


}