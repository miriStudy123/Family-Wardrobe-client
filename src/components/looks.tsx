import { useQuery } from "@tanstack/react-query";
import { GetAll } from "../services/authLook"
import type { Look } from "../pages/clothes";
type LooksProps = {
    setChoose: (items: Look[]) => void
}
const Looks =  ({setChoose}:LooksProps) => {
     const { data, isPending, isError } = useQuery({
            queryKey: ["getAllLooks"],
            queryFn: () => GetAll()
        })
    return (<>
    {isPending&&<p className="muted col-span-full">just a minute:)❤️❤️❤️</p>}
    {isError&&<p className="error-text col-span-full">error by server</p>}
    {
        data?.map((item, ind) => {
           
                return(<>
                    <p className="look-name">{item.name}</p>
                    {item.items.map((item2) => {
                        return (<>
                            <p className="truncate text-[15px]">{item2.name}</p>
                            <img className="thumb" src={item2.imageUrl} />
                            <p className="pill">{item2.isAvailable ? "זמין" : "לא זמין"}</p>
                            
                        </>)

                    })}
                    <button className="btn-secondary btn-sm col-span-full justify-self-start" onClick={()=>{
                                setChoose(item.items)
                            }}>לבחירת הלוק להיום</button>
                </>)
            
        })
    }
    </>

    )
}
export default Looks