import { ReactNode } from "react";
import { Body } from "./styles";

export default function Main({ children } : { children : ReactNode}) {
    return (
        <>
            <Body>
                {children}
            </Body>
        </>
    )
}