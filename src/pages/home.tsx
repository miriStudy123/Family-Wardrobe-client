import { useContext } from "react"
import { Context } from "../context/useContext"

const Home=()=>{
    const userr=useContext(Context)?.userr;

    return<div className="page">
        <p className="home-hello">שלום ל{userr?.role=="admin"?"אמא" :userr?.name}</p>
        <div className="home-intro">
            ברוכים הבאים לארון הדיגיטלי שלכם 👗
כאן תוכלו לארגן את הבגדים, לשלב בין פריטים וליצור את הלוקים שהכי מתאימים לכם.
כל הבגדים שלכם במקום אחד, מסודרים ונגישים בכל זמן ומכל מקום.
תוכלו לתכנן מראש מה ללבוש, למצוא בקלות את השילובים האהובים עליכם
ולהגיע לכל יום מוכנים בסטייל! 💫
        </div>
    </div>
}
export default Home