import { useMutation, useQuery } from "@tanstack/react-query"
import { GetClothes } from "../services/clothesFunction"
import { DeleteClothesFunc } from "../services/delete"
import { useState } from "react"
import type { Look } from "../pages/clothes"

export type ClothingItem = {
    id: string,
    name: string,
    imageUrl: string | null,
    isAvailable: boolean,
    season: string,
    
}
const DeleteClothes = () => {
    const [succes, setSuccues] = useState(false);
    const { data, isPending,refetch } = useQuery({
        queryKey: ["getAllTheClothes"],
        queryFn: () => GetClothes("")
    })
    const MutasionDelete = useMutation({
        mutationFn: DeleteClothesFunc
    })
    return <>
        {isPending && <p className="status-line" >מעלים את הנתונים רק רגע...</p>}
        {MutasionDelete.isPending && <p className="status-line">תהליך המחיקה תכיף מסתיים...</p>}
        {
            data?.map((item: Look) => {
                return (
                    <div className="del-card">
                        <p>{item.name}</p>
                        <img src={item.imageUrl} />
                        <button className="del-action" onClick={async () => {
                            if (confirm("את בטוחה שאת רוצה למחוק את הבגד?")) {
                                const res = await MutasionDelete.mutateAsync(item.id)
                                if (res) {
                                    setSuccues(true);
                                    await refetch()
                                    setTimeout(() => setSuccues(false), 10000);
                                }
                            }
                        }
                        }>🗑️ למחיקת פריט זה מהארון</button>
                    </div>
                )
            })
        }
        {succes && <p className="toast">✅ המחיקה בוצעה בהצלחה!</p>}
        
    </>
}
export default DeleteClothes