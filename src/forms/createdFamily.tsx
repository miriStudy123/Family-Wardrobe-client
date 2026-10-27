import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { AddFamily } from "../services/createFamily_Child"
import { useNavigate } from "react-router-dom"
export type Family =
    {
        Name: string,
        adminCode: string,
        confirmPassword: string

    }

const CreatedFamily = () => {

    const { register,
        handleSubmit,
        getValues,
        formState: { errors },

    } = useForm<Family>();
    const MutasionFamily = useMutation({
        mutationFn: AddFamily
    })
    const navigate = useNavigate();
    const onsubmit = async (data: Family) => {
        const res = await MutasionFamily.mutateAsync(data);
        if (res) {
            console.log(res);

        }

    }
    return <div>
        <h1 className="form-heading">בואי ניצור משפחה חדשה</h1>
        <form className="form auth-card mt-6" onSubmit={handleSubmit(onsubmit)}>
        <label className="label" >שם משפחה</label>
        <input className="input" type="text" placeholder="לדוג-משפחת כהן"{
            ...register("Name", {
                required: "זהו שדה חובה"
            })
        } >
        </input>
        <label className="label" htmlFor="adminCode">קוד מנהל</label>
        <input className="input" type="text" placeholder="לפחות 8 תוים"
            {
            ...register("adminCode", {
                required: "זהו שדה חובה",
                minLength:{
                    value:8,
                    message:"יש להזין לפחות 8 תוים"

                }

            })
            }></input>
        {errors.adminCode && <p className="error-text">{errors.adminCode.message}</p>}
        <label className="label" htmlFor="check">אימות סיסמה</label>
        <input className="input" type="text" {
            ...register("confirmPassword", {
                required: "זהו שדה חובה",
                validate: (value) =>
                    value == getValues("adminCode") || "הסיסמאות אינן תואמות"
            })
        }
        ></input>
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
        <button className="btn-primary mt-2">להוספת המשפחה למערכת</button>
        {MutasionFamily.isPending && <p className="muted text-center">loading...</p>}
        {MutasionFamily.isSuccess && MutasionFamily.data !=false && <div className="alert-success flex flex-col gap-2"><p>המשפחה נוצרה!</p>
            <p className="font-normal">קוד המשפחה שלכם הוא:</p>
            <p className="code-box">{MutasionFamily.data}</p>
            <button className="btn-secondary" type="button" onClick={() => {
                navigate("/");
            }}>להמשך התחברות כמנהל</button>
        </div>}
        {MutasionFamily.data == false && <div className="alert-error">problemmm
        </div>}
    </form>
    </div>
    
}

export default CreatedFamily