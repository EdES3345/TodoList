import { useEffect, useState } from "react"

import { InputText } from "../littleComponents/InputText"
import { Button } from "../littleComponents/Button"
import { ButtonInformationBox, InformationBox } from "../littleComponents/InformationBox"
import { Link, useNavigate } from "react-router";

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("session_id_setup") === "true") {
            navigate("/list")
        }
    }, [])

    const [inputId, setInputId] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [statueFetch, setStatueFetch] = useState<"error" | "bad_authentication" | undefined>();
    const [activateButtonSubmit, setActivateButtonSubmit] = useState(false);

    
     const handleAccessAccount = async () => {
        setActivateButtonSubmit(false);
        await fetch("/api/users/login", {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body : JSON.stringify({
                userId: inputId,
                password: inputPassword
            })
        })
        .then((res) => {
            if(res.status === 403) setStatueFetch("bad_authentication");
            else {
                localStorage.setItem("session_id_setup", "true")
                navigate("/list");
            }
        })
        .catch(() => {
            setStatueFetch("error");
        });
        setActivateButtonSubmit(true);
    }

    useEffect(() => {
        if((inputId.length && inputPassword.length) === 0) setActivateButtonSubmit(false);
        else setActivateButtonSubmit(true);
    }, [inputId, inputPassword])

    return (
        <section className="flex flex-col items-center">
            <h1>TodoList</h1>
            <h2>Se connecter</h2>
            <div className="flex flex-col items-center gap-2 w-52">
                <label htmlFor="id" className="text-sm">Identifiant</label>
                <InputText id="id" placeholder="Identifiant" value={inputId} onChange={(e) => setInputId(e.target.value)} className="w-full p-2 " />
                <label htmlFor="password" className="text-sm">Mot de passe</label>
                <InputText id="password" type="password" placeholder="Mot de passe" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} className="w-full p-2" />
                
                <Button onClick={handleAccessAccount} className="w-full p-2" disabled={!activateButtonSubmit}>Se connecter</Button>
                <Link to="/signup"><Button className="w-full p-2" >Créer un compte</Button></Link>
                
                {statueFetch === "bad_authentication" && <InformationBox styleBox="error" className="flex flex-col items-center" >
                    Mauvais identifiant ou mot de passe
                    <ButtonInformationBox styleBox="error" onClick={()=> setStatueFetch(undefined)}>OK</ButtonInformationBox>
                </InformationBox>}

                {statueFetch === "error" && <InformationBox styleBox="error" className="flex flex-col items-center" >
                    Erreur
                    <ButtonInformationBox styleBox="error" onClick={()=> setStatueFetch(undefined)}>OK</ButtonInformationBox>
                </InformationBox>}
            </div>
            {/* <p className="text-center">Pour créer un compte, vous devez disposer d'un lien d'activation.</p> */}
        </section>
    )
}