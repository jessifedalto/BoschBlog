import Forms from "./Forms";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../../components/NavBar";
import Main from "../../components/Main";

export default function LoginPage()
{
    return (
        <>
            <NavBar />
            <Main>
                <ToastContainer/>        
                <Forms/>
            </Main>
        </>
    )
}