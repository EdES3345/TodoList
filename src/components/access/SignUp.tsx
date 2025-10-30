import { Link } from "react-router"

import { InputText } from "../littleComponents/InputText"
import { Button } from "../littleComponents/Button"

export default function SignUp() {
    return (
        <section className="flex flex-col items-center">
            <h1>TodoList</h1>
            <h2>Créer un compte</h2>
            <div className="flex flex-col items-center gap-2 max-w-100">
                <InputText type="text" placeholder="Choisisez votre identifiant" className="w-full p-2 "/>
                <InputText type="password" placeholder="Créez votre mots de passe" className="w-full p-2" />
                <Link to={"/login"}><Button className="w-full p-2">Créer votre compte</Button></Link>
            </div>
        </section>
    )
}