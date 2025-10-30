import { Link } from "react-router"

import { Button } from "../littleComponents/Button"
import { InputText } from "../littleComponents/InputText"

export default function Login() {
    return (
        <section className="flex flex-col items-center">
            <h1>TodoList</h1>
            <h2>Se connecter</h2>
            <div className="flex flex-col items-center gap-2 max-w-100">
                <InputText type="text" placeholder="Idenifiant" className="w-full p-2 "/>
                <InputText type="password" placeholder="Mot de passe" className="w-full p-2" />
                <Link to={"/list"}><Button className="w-full p-2">Connexion</Button></Link>
            </div>
            <p className="text-center">Pour créer un compte, vous devez disposer d'un lien d'activation.</p>
        </section>
    )
}