import { useMutation } from "@tanstack/react-query";
import { AddChildren } from "../services/createFamily_Child";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type childAdd = {
    name: string,
    gender: string
}
const CreateChilde = () => {

    const { register,
        handleSubmit,
      
        formState: { errors },

    } = useForm<childAdd>();
    const MutasionChilde = useMutation({
        mutationFn: AddChildren
    })
    const navigate = useNavigate();
    const onsubmit = async (data: childAdd) => {
        const res = await MutasionChilde.mutateAsync(data);
        if (res) {
            console.log(res);

        }

    }
    return <form className="form auth-card" onSubmit={handleSubmit(onsubmit)}>
        <label className="label" >שם :</label>
        <input className="input" type="text" placeholder="לדוג- ארי"{
            ...register("name", {
                required: "זהו שדה חובה"
            })
        } >
        </input>
        <label className="label">מין </label>
        <label className="check">
            <input className="checkbox" type="radio" value="boy"
                {
                ...register("gender", {
                    required: "זהו שדה חובה",

                }

                )}
            ></input>
            בן
        </label>
        

        <label className="check">
            <input className="checkbox" type="radio" value="girl"
                {
                ...register("gender", {
                    required: "זהו שדה חובה",

                }

                )}
            ></input>
            בת
        </label>
         {errors.gender && <p>{errors.gender.message}</p>}


        <button className="btn-primary mt-2">להוספת הילד למאגר</button>
        {MutasionChilde.isPending && <p className="muted text-center">loading...</p>}
        {MutasionChilde.isSuccess && MutasionChilde.data != false && <div className="alert-success flex flex-col gap-2"><p>הילד התווסף בהצלחה!</p>

            <p className="font-normal">קוד הכניסה של הילד הוא:</p>
            <p className="code-box">{MutasionChilde.data}</p>
            <p>אנא שימרו קוד זה לא תינתן כניסה למערכת ללא קוד זיהוי</p>
            <button className="btn-secondary" type="button" onClick={() => {
                navigate("/");
            }}>להמשך התחברות כילד</button>
        </div>}
        {MutasionChilde.data == false && <div className="alert-error">problemmm
        </div>}

    </form>
}
export default CreateChilde