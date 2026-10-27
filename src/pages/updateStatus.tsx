import { useMutation, useQuery } from "@tanstack/react-query"
import { GetNotAvailable, UpDate } from "../services/updateStatus"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import type { Look } from "./clothes";

const UpdateStatus = () => {
    const [updated, setUpdated] = useState<string[]>([]);

    const { data, isPending, isError } = useQuery({
        queryKey: ["getclothesunaviable"],
        queryFn: () => GetNotAvailable()
    })
    const MutasionUpdate = useMutation({
        mutationFn: UpDate
    })
    const navigate=useNavigate();

    return <>
        <div className="returns-grid">
            {isPending && <p className="pill col-span-full mt-3">טוען...</p>}
            {isError && <p className="error-text col-span-full mt-3">...שגיאה</p>}
            {MutasionUpdate.isPending && <p className="pill col-span-full mt-3">...מעדכן</p>}

            {

                data?.map((item: Look) => {
                    return (<>
                        <p className="tile-top">{item.name}</p>
                        <img className="tile-img" src={item.imageUrl} />
                        <button className="tile-action" onClick={async () => {
                            const res = await MutasionUpdate.mutateAsync(item.id)
                            if (res) setUpdated([...updated, item.id]);
                        }}>{updated.includes(item.id) ? "הבגד בארון ✓" : "להחזרה לארון"}
                        </button>
                    </>
                    )
                })
            }
        </div>
        <button className="btn-secondary mx-auto mt-10 w-72" onClick={()=>{
            navigate("/app/AddClothe/")
        }}>➕ להוספת בגד לילד 👕</button>
         <button className="btn-ghost mx-auto mt-3 mb-14 w-72" onClick={()=>{
            navigate("/app/DeleteClothes/")
        }}>🗑️ למחיקת בגד לילד</button>
    </>
}
export default UpdateStatus