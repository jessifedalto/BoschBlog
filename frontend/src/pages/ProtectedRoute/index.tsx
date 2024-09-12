import { ReactElement, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

interface IProtectedRoute {
    errorPage : ReactElement,
    targetPage : ReactElement;
}


export default function ProtectedRoute({ errorPage, targetPage } : IProtectedRoute) {
    const [page, setPage] = useState(<></>);

    function renderPage() {
        const token = sessionStorage.getItem('token');

        if (!token) {
            setPage(errorPage)
            return
        }
        const decodeToken : { exp : number} = jwtDecode(token)
        const { exp } = decodeToken;

        const tokenExpirationTime = exp * 1000;

        if (tokenExpirationTime - Date.now() <= 0) {
            setPage(errorPage)
            return
        }
        setPage(targetPage)
    }
    useEffect(() => {
        renderPage()
    }, [])
    return page;
}