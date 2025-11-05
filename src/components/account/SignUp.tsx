import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router";

import { InputText } from "../littleComponents/InputText"
import { Button } from "../littleComponents/Button"
import { ButtonInformationBox, InformationBox } from "../littleComponents/InformationBox"

export default function SignUp() {

    const navigate = useNavigate();

    const [inputId, setInputId] = useState("");
    const [inputPassword, setInputPassword] = useState("")
    const [maxLenghtInputId, setMaxLenghtInputId] = useState(false);
    const [maxLenghtInputPassword, setMaxLenghtInputPassword] = useState(false);
    const [statueFetch, setStatueFetch] = useState<"ok" | "error" | "same_id" | undefined>();
    const [activateButtonSubmit, setActivateButtonSubmit] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("session_id_setup") === "true") {
            navigate("/list")
        }
    }, [])
        
    useEffect(() => {
        if(statueFetch === "same_id") setStatueFetch(undefined)
    }, [inputId])

    const handleChangeId = (value: string) => {
        if (value.length < 30) setInputId(value);
        if(value.length < 29) setMaxLenghtInputId(false);
        else setMaxLenghtInputId(true);
    }

    const handleChangePassword = (value: string) => {
        if (value.length < 30) setInputPassword(value);
        if(value.length < 29) setMaxLenghtInputPassword(false);
        else setMaxLenghtInputPassword(true);
    }
    
     const handleCreateAccount = async () => {
        setActivateButtonSubmit(false);
        await fetch("/api/users/signup", {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                userId: inputId,
                password: inputPassword
            })
        })
        .then((res) => {
            if(res.status === 409) setStatueFetch("same_id")
            else {
            setStatueFetch("ok");
            setInputId("");
            setInputPassword("");
            }
        })
        .catch(() => {
            setStatueFetch("error")
        } );
        setActivateButtonSubmit(true);
        setMaxLenghtInputId(false);
        setMaxLenghtInputPassword(false);
    }

    useEffect(() => {
        if((inputId.length && inputPassword.length) === 0) setActivateButtonSubmit(false);
        else setActivateButtonSubmit(true);
    }, [inputId, inputPassword])

    return (
        <section className="flex flex-col items-center">
            <h1>TodoList</h1>
            <h2>Créer un compte</h2>
            <div className="flex flex-col items-center gap-2 w-52">
                <label htmlFor="id" className="text-sm">Identifiant</label>
                <InputText id="id" placeholder="Identifiant (30 caractéres max)" value={inputId} onChange={(e) => handleChangeId(e.target.value)} className="w-full p-2 " />
                {maxLenghtInputId && <InformationBox styleBox="info">Taille maximale atteinte pour votre identifiant (30 caractéres max)</InformationBox>}
                
                <label htmlFor="password" className="text-sm">Mot de passe</label>
                <InputText id="password" type="password" placeholder="Mot de passe (30 caractéres max)" value={inputPassword} onChange={(e) => handleChangePassword(e.target.value)} className="w-full p-2" />
                {maxLenghtInputPassword && <InformationBox styleBox="info">Taille maximale atteinte pour votre mot de passe (30 caractéres max)</InformationBox>}
                
                <Button onClick={handleCreateAccount} className="w-full p-2" disabled={!activateButtonSubmit}>Créer votre compte</Button>
                
                {statueFetch === "ok" && <InformationBox styleBox="success">
                    Compte créé avec succès
                    <div className="flex gap-2">
                        <Link to="/login">
                            <ButtonInformationBox styleBox="success" >Se connecter</ButtonInformationBox>
                        </Link>
                        <ButtonInformationBox styleBox="success" onClick={()=> setStatueFetch(undefined)}>OK</ButtonInformationBox>
                    </div>
                </InformationBox>}
                
                {statueFetch === "same_id" && <InformationBox styleBox="error" className="flex flex-col items-center" >
                    L'identifiant {inputId} que vous avez séléctionné existe déja. Merci de changer votre identifiant.
                    <ButtonInformationBox styleBox="error" onClick={()=> setStatueFetch(undefined)}>OK</ButtonInformationBox>
                </InformationBox>}

                {statueFetch === "error" && <InformationBox styleBox="error" className="flex flex-col items-center" >
                    Erreur lors de la création du compte
                    <ButtonInformationBox styleBox="error" onClick={()=> setStatueFetch(undefined)}>OK</ButtonInformationBox>
                </InformationBox>}

                
            </div>
        </section>
    )
}