import Main from "../../components/Main";
import NavBar from "../../components/NavBar";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage()
{
    return (
        <>
            <NavBar/>
            <Main>
               <RegisterForm/>
            </Main>
        </>
    )
}