import { useQuery } from "@tanstack/react-query"
import { GetAllMassege } from "../services/masseges"

const MassegeToChild=()=>{
    const { data, isPending, isError } = useQuery({
            queryKey: ["GetAllMassege"],
            queryFn: () => GetAllMassege()
        })
return<>
{data?.map((item,ind)=>{
    return<>
    <p className="msg-mine">{item.body}</p>
    {item.readAt && <p className="msg-foot">✓ ההודעה נקראה</p>}
   {!item.readAt && <p className="msg-foot text-stone-500">◉ ההודעה עדיין לא נקראה</p>}
    </>
})}
</>
}
export default MassegeToChild