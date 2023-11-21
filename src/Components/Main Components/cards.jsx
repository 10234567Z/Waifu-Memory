import { useEffect, useState } from "react";
import axios from "axios";
import loading from "./Assets/loading.gif"
import { Progress } from "rsup-progress";

export default function Cards() {
    const [clicked, setClicked] = useState(false)
    const [selected, setSelected] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [imgLinks, setImgLinks] = useState([])
    const [cNames, setCNames] = useState([])
    const url = "https://waifu.it/api/waifu";

    useEffect(() => {
        const progress = new Progress({
            height: 5,
            color: 'red',
        })
        const fetchWaifu = async () => {
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
                if (err.response.status === 429) {
                    location.reload()
                }
                throw new Error(err.message)
            }
        }

        const GetWaifu = async () => {
            const uniqueNames = new Set(cNames);
            try {
                progress.start()
                const promises = Array.from({ length: 16 }, async (_, i) => {
                    let data;
                    do {
                        data = await fetchWaifu();
                    } while (uniqueNames.has(data.names.en));
                    return data;
                });

                let results = await Promise.all(promises)
                results.forEach((data, i) => {
                    let rand = 0;
                    while (rand < data.images.lengths && data.images[rand].includes("thicc.mywaifulist")){
                        rand++
                    };
                    setImgLinks((prev) => [...prev, data.images[rand]]);
                    setCNames((prev) => [...prev, data.names.en]);
                });
                setLoaded(true)
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
        
    }, [])

    let randIndex = []
    for (let i = 0; i < 4; i++) {
        let rand = Math.floor(Math.random() * 16)
        while (randIndex.includes(rand)) {
            rand = Math.floor(Math.random() * 16)
        }
        randIndex.push(rand)
    }

    const reload = () => {
        localStorage.clear()
        location.reload();
    }

    const save = (e) => {
        localStorage.setItem('Character Names', JSON.stringify(cNames))
        localStorage.setItem('image links', JSON.stringify(imgLinks))
        e.target.remove();
    }


    const bRad = (i) => {
        if(i % 2 == 0){
            return "0 10px 0 10px"
        }
        else{
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
                            {randIndex.map((i,j) => (
                                <button className="card" key={i} style={{borderRadius: bRad(j)}}>
                                    <div className="image">
                                        <img src={imgLinks[i]} alt="cardImage" width="250px" height="250px"></img>
                                    </div>
                                    <h3>{cNames[i]}</h3>
                                </button>
                            ))}

                        </section>
                        <div className="controls">
                            <button onClick={reload}>Reload Waifus</button>
                            { localStorage.getItem("Character Names") == null && <button onClick={save}>Save Loaded Collection</button>}
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