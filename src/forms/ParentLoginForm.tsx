
import { useForm } from "react-hook-form"
import { checkFamilyExist, checkUserExist } from "../services/authService"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import CreatedFamily from "../forms/createdFamily"
import { useNavigate } from "react-router-dom"

import { Context } from "../context/useContext"
import { useContext } from "react"


export type person = {
    familyName: string,
    FamilyCode: string,
    idMeneger?: string,
}
export type child = {
    familyName: string,
    FamilyCode: string,
    childName?: string,
    childCode?: string
}

const ParentLoginForm = () => {
    const context = useContext(Context);
    if (context == null) {
        throw new Error("Context לא נמצא");
    }
    const { getToken } = context;

    const [loginType, setLoginType] = useState<"parent" | "child">("parent")
    const { register, handleSubmit,
        formState: { errors },
    } = useForm<person | child>();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: checkFamilyExist
    })
    const mutationChild = useMutation({
        mutationFn: checkUserExist
    })
    const onsubmit = async (data: person | child) => {
        if (loginType === "parent") {
            const res = await mutation.mutateAsync(data as person)
            if (res) {
                getToken(res);
                alert("welcome to the wardrobe Clouteht Family ");
                navigate("app/Home");

            }

        }
        else {
            const res = await mutationChild.mutateAsync(data as child)
            if (res) {

                getToken(res);
                alert("welcome to the wardrobe ");
                navigate("app/Home");

            }
        }
    }

    return (
        <div className="login-switch">

            <button className="tab" type="button" onClick={() => setLoginType("parent")}>כניסת הורה</button>
            <button className="tab" type="button" onClick={() => setLoginType("child")}>לארון הבגדים שלי</button>
            
            <form className="form col-span-2 mt-4" onSubmit={handleSubmit(onsubmit)}>
                < input className="input" type="text"
                    placeholder="familyName"
                    {...register("familyName", {
                        required: "לא כתבת את שם המפחה זה שדה חובה!"
                    })
                    }></input>
                {"familyName" in errors && errors.familyName?.message && (
                    <p className="error-text">{errors.familyName.message}</p>
                )}
                <input className="input" type="text"
                    placeholder="FamilyCode"
                    {...register("FamilyCode", {
                        required: "לא כתבת את קוד המשפחה זה שדה חובה!"
                    })
                    }></input>

                {"FamilyCode" in errors && errors.FamilyCode?.message && (
                    <p className="error-text">{errors.FamilyCode.message}</p>
                )}
                {loginType === "parent" && <input className="input" type="text"
                    placeholder="idMeneger"
                    {...register("idMeneger", {
                        required: "לא שמת סיסמה זה שדה חובה",
                    })
                    }></input>}


                {loginType === "child" && <input className="input" type="text"
                    placeholder="childName"
                    {...register("childName", {
                        required: "לא שמת שם זה שדה חובה",
                    })
                    }></input>}
                {"childName" in errors && errors.childName?.message && (
                    <p className="error-text">{errors.childName.message}</p>
                )}
                {loginType === "child" && <input className="input" type="text"
                    placeholder="childCode"
                    {...register("childCode", {
                        required: "לא שמת את סיסמה שלך זה שדה חובה",
                    })
                    }></input>}
                {loginType === "parent" && <button className="btn-primary mt-2">כניסה כמנהל</button>}
                {loginType === "child" && <button className="btn-primary mt-2">כניסה לארון</button>}
                <button className="text-link" type="button" onClick={()=>{
                    navigate("/createFamily");
                }}>אין לך עדיין משפחה? ליצירת משפחה לחצי עלי</button>

                {loginType === "parent" && mutation.data == false ?
                    <div className="alert-error"><p>אינך מחובר למערכת או שאחד מהנתונים שגוי </p>
                        <button className="btn-secondary btn-sm self-start" onClick={() => {
                            navigate("/createFamily")
                        }}>ליצירת משפחה </button>

                    </div> : null}
                {loginType === "child" && mutationChild.data == false ?
                    <div className="alert-error"><p>אינך מחובר למערכת או שאחד מהנתונים שגוי </p>
                        <button className="btn-secondary btn-sm self-start" onClick={() => {
                            navigate("/createFamily")
                        }}>ליצירת משפחה </button>

                    </div> : null}

                {loginType == "parent" && mutation.isError && <p className="error-text">login failed problem with server</p>}
                {loginType == "parent" && mutation.isPending && <p className="muted text-center">loading...</p>}

                {loginType === "child" && mutationChild.isPending && <p className="muted text-center">loading...</p>}
                {loginType === "child" && mutationChild.isError && <p className="error-text">login failed problem with server</p>}
                {"idMeneger" in errors && errors.idMeneger?.message && <p className="error-text">{errors.idMeneger.message}</p>}
                {"childCode" in errors && errors.childCode?.message && <p className="error-text">{errors.childCode.message}</p>}
            </form>
        </div>
    )
}

export default ParentLoginForm