import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddClothing, getAllChildren } from "../services/addClothes";
import { UploadImage } from "../services/UploadImage";

export type Clothes = {
    childId: string,
    name: string,
    category: string,
    season: string,
    image?: FileList,
    imageUrl?: string,
    isAvailable?: boolean

}

const AddClothe = () => {
    const [Childid, setchildid] = useState("");
    const [added, setAdded] = useState(false);

    const { register,
        handleSubmit,
        reset,
        formState: { errors },

    } = useForm<Clothes>();
    const { data, isPending, isError } = useQuery({
        queryKey: ["getAllChildren"],
        queryFn: () => getAllChildren()
    })
    const MutasionAddClothes = useMutation({
        mutationFn: AddClothing
    })
    const MutasionAddImage = useMutation({
        mutationFn: UploadImage
    })

    const onsubmit = async (data: Clothes) => {
        let url = undefined;
        if (data.image?.[0]) {
            url = await MutasionAddImage.mutateAsync(data.image[0])
            if (!url) {
                alert("העלאת התמונה נכשלה");
                return;
            }
        }
        const newClothe = {
            childId: Childid,
            name: data.name,
            category: data.category,
            season: data.season,
            imageUrl: url

        }
        const res = await MutasionAddClothes.mutateAsync(newClothe);
        if (res) {
            setAdded(true)
            setTimeout(() => setAdded(false), 3000);
            reset();
        };
    }


    return <div className="card mx-auto my-10 flex w-[calc(100%-2rem)] max-w-xl flex-col gap-5">
        {isPending && <p className="muted">אנחנו מעלים את הנתונים...</p>}
        {isError && <p>אופס אירעה שגיעה בהבאת הנתונים אנא פנו למנהל המערכת</p>}
        <h1 className="section-title text-xl">בחר את הילד שברצונך להוסיף לו בגד חדש לארון 👖👗👕</h1>
        <div className="pick-list">
            {data?.map((item: { id: string, name: string }) => {
                return (<><p className="truncate font-semibold text-stone-700">{item.name}</p>
                    <button className="chip" onClick={() => {
                        setchildid(item.id)
                    }
                    }>להוספת בגד</button>
                </>
                )

            })}
        </div>

        <form className="form" onSubmit={handleSubmit(onsubmit)}>
            <label className="label" >קוד ילד</label>
            <input className="input" type="password" value={Childid} {
                ...register("childId")
            }></input>
            <label className="label" >שם הבגד</label>
            <input className="input" type="text" {
                ...register("name",{
                    required:"חובה למלאות שם בגד"
                })
            } ></input>
            {errors.name && <p>{errors.name.message}</p>}
            <label className="label">קטגוריה</label>
            <select className="input"{...register("category",{
                    required:"חובה למלאות לאיזה עונה שייך"
                })} >
                    <option value="shirt">חולצה</option>
                    <option value="skirt">חצאית</option>
                    <option value="dress">שמלה</option>
                    <option value="trousers">מכנסיים</option>
                    <option value="accessories">אקססוריז</option>
                </select>
            
            {errors.category && <p>{errors.category.message}</p>}
            <label className="label">לאיזה עונה הבגד מתאים?</label>
            <select className="input" {...register("season")}>
                <option value="all_season">כל השנה</option>
                <option value="summer">קיץ</option>
                <option value="winter">חורף</option>


            </select>
            <label className="label"> ▧ ↑ להעלאה תמונה של הבגד</label>
            <input className="input file-input" type="file" accept="image/*"
                {...register("image")}></input>
            <button className="btn-primary mt-2" >הוספת הבגד</button>
        </form>
        {MutasionAddImage.isPending && <p className="muted">אנחנו באמצע לעדכן את התמונה של הבגד החדש בארון...</p>}
        {MutasionAddClothes.isPending && <p className="muted">אנחנו באמצע לעדכן את הבגד החדש בארון...</p>}

        {added && <div className="alert-success">הבגד נוסף בהצלחה 👕</div>}
    </div>
}
export default AddClothe