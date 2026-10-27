import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react";
import { GetClothes, SaveMyChoise } from "../services/clothesFunction";
import { AddLook } from "../services/authLook";
import Looks from "../components/looks";
import { SendMassege } from "../services/masseges";
import { Context } from "../context/useContext";

export type Look = {
    id: string,
    name: string,
    imageUrl: string
}
export type LookAdd = {

    name: string,
    looksToAdd: string[]
}
const Clothes = () => {

    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [choose, SetChooes] = useState<Look[]>([]);
    const [nameLook, SetNameLook] = useState("");
    const [succes, setsucces] = useState(false);
    const [massege, setmassege] = useState("");
    const [sendMasege, setsendmassege] = useState(false);
    const contex = useContext(Context)
    var user;
    if (contex) {
        user = contex.userr
    }
    const params = new URLSearchParams();
    if (category) {
        params.set("category", category);
    }

    if (onlyAvailable) {
        params.set("isAvailable", "true");
    }
    if (season) {
        params.set("season", season);
    }

    const filter = params.toString();
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ["clothes", category, onlyAvailable, season],
        queryFn: () => GetClothes(filter ? `?${filter}` : "")
    })



    return <div className="closet">
        {isPending && <p>loading...</p>}
        {isError && <p>אופס שגיעה במהלך הבאת הנתונים אנא פנה למנהל המערכת</p>}
        <button className="chip" onClick={() => setCategory("")}>הכל</button>
        <button className="chip" onClick={() => setCategory("shirt")}>חולצות</button>
        {user?.gender == "boy" && <button className="chip" onClick={() => setCategory("trousers")}>מכנסיים</button>}
        {user?.gender == "girl" && <button className="chip" onClick={() => setCategory("dress")}>שמלות</button>}
        {user?.gender == "girl" && <button className="chip" onClick={() => setCategory("skirt")}>חצאיות</button>}
        <button className="chip" onClick={() => setCategory("accessories")}>אביזרים</button>
        <label className="check">
            <input className="checkbox" type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => {
                    setOnlyAvailable(e.target.checked)
                }}
            >

            </input>
            רק בגדים זמינים
        </label>
        <select className="input w-auto" onChange={(e) => { setSeason(e.target.value) }} >
            <option value="">כל העונות</option>
            <option value="summer">קיץ</option>
            <option value="winter">חורף</option>
            <option value="all_season">כל השנה</option>
        </select>

        <div className="closet-cards">
            {data?.map((item: Look & { season: string, isAvailable: boolean }, ind: number) => {
                return (<>
                    <p className="tile-top" key={ind}>{item.name}</p>
                    <img className="tile-img" src={item.imageUrl} alt={item.name} />
                    <p className="tile-meta">{item.season}</p>
                    <p className="tile-meta pb-3 font-semibold text-brand-700">{item.isAvailable ? " זמין" : "לא זמין "}</p>
                    <button className="tile-action" onClick={() => {

                        let ans = choose.filter((x) => x.id == item.id)
                        if (ans.length === 0) {
                            SetChooes([...choose, item])

                        }
                        else {

                            let ans = choose.filter((x) => x.id != item.id)
                            SetChooes(ans)

                        }

                    }}>{choose.some((x) => x.id === item.id) ? "הסרה מהבחירה" : "הוספה לבחירה"}</button>
                </>)
            })}
        </div>
        <div className="closet-panel">
            {choose.map((item, ind) => {
                return (<>
                    <p className="chosen" key={ind}>{item.name}</p>
                    <img className="thumb" src={item.imageUrl} alt={item.name} />
                </>
                )
            })}
            <label className="label col-span-full">שם הלוק</label>
            <input className="input col-span-full" type="text" value={nameLook} onChange={(e) => { SetNameLook(e.target.value) }} />
            <button className="btn-secondary col-span-full" onClick={async () => {
                let newname = {
                    name: nameLook,
                    looksToAdd: choose.map((item) => item.id)
                }
                const res = await AddLook(newname);
                if (res) {
                    alert("הלוק נוסף בהצלחה👗")
                    SetNameLook("");
                }
            }}>להוספה ללוקים הקבועים</button>
            <button className="btn-primary col-span-full" onClick={async () => {
                const res = await SaveMyChoise(choose.map((item) => item.id))
                if (res) {
                    SetChooes([]);
                    await refetch();
                    alert("בחירת הפריטים התבצעה בהצלחה ")

                }
                else {
                    alert("אופסס שגיאה במהלך עדכון הלוק שלך היום כנראה אחד הפריטים שבחרת לא זמינים אנא נסה שנית");
                }

            }}>אני לובש את זה😍</button>
        </div>
        <div className="closet-looks">

            <button className="btn-secondary btn-sm col-span-full justify-self-start" onClick={() => setsucces(!succes)}>לצפייה בלוקים הקבועים</button>
            {succes && <Looks setChoose={SetChooes} />}
        </div>
        <div className="closet-msg">
            <p className="section-title">הודעה להורים</p>
            <p className="muted -mt-2">מה תרצה לכתוב?</p>
            <textarea className="input min-h-28 resize-y" value={massege} onChange={(e) => {
                setmassege(e.target.value)
            }}></textarea>
            <button className="btn-primary self-start" onClick={async () => {
                if (massege != "") {
                    const res = await SendMassege(massege)
                    if (res) {
                        setsendmassege(true)
                        setTimeout(() => setsendmassege(false), 10000);
                        setmassege("");
                    }
                }

            }}>📨 לשליחת ההודעה </button>
        </div>
        {sendMasege && <p className="alert-success closet-sent">✅ ההודעה נשלחה בהצלחה!</p>}
    </div>
}
export default Clothes