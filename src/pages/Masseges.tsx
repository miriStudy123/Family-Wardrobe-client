import { useMutation, useQuery } from "@tanstack/react-query"
import { GetAllMassege, MarkAsRead } from "../services/masseges"

const Masseges = () => {
    const { data, refetch} = useQuery({
        queryKey: ["GetAllMassege"],
        queryFn: () => GetAllMassege()
    })
const Mutasion=useMutation({
    mutationFn:MarkAsRead
})
    return <>
        {
            data?.map((item: { id: string, childName: string, body: string, createdAt: string, readAt: string | null }) => {
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