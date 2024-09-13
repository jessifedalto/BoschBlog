import Forms from "./Forms";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../../components/NavBar";
import Main from "../../components/Main";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage()
{
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            navigate("/main");
        }
    })

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