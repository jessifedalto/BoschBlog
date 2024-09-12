// import { useEffect, useState } from "react";



// export default function ProtectedRoute({ errorPage, targetPage, func }){
//     const [page, setPage] = useState(<></>);
    
//     function renderPage(){
//     const token = sessionStorage.getItem('token');
    
//     if(!token) {
//     setPage(errorPage)
//     return
//     }
//     const decodeToken = jwt_decode(token)
//     const { exp } = decodeToken;
//     if(exp+'000' - Date.now()<=0){
//     setPage(errorPage)
//     return
//     }
//     setPage(targetPage)
// }
//     useEffect(() => {
//         renderPage()
//     }, [])

//     return page;
// }