import { useMutation, useQuery } from "@tanstack/react-query"
import { GetAllMassege, MarkAsRead } from "../services/masseges"
import { useState } from "react"

const Masseges = () => {
    const { data, isPending, isError ,refetch} = useQuery({
        queryKey: ["GetAllMassege"],
        queryFn: () => GetAllMassege()
    })
    const [reed,setread]=useState(false);
const Mutasion=useMutation({
    mutationFn:MarkAsRead
})
    return <>
        {
            data?.map((item, ind) => {
                return (<><p className="msg-from">{item.childName}</p>
                    <p className="msg-body">{item.body}</p>
                    <p className="msg-date">{item.createdAt}</p>
                    <button className="msg-action" onClick={async()=>{
                     await  Mutasion.mutateAsync(item.id)
                      await refetch()
                    }}>{item.readAt?"✓ קראתי":"✅ אישור ההודעה"}</button>
                </>
                )

            })
        }
        {Mutasion.isPending && <p className="status-line">ההודעה מתעדכנת כנקראה...</p>}
        {Mutasion.isError && <p className="status-line text-rose-600">טעות בעדכון ההודעה כנקראה אנה פנה למנהל המערכת...</p>}
    </>
}
export default Masseges