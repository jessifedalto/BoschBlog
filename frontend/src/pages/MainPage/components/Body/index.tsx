import { ReactNode } from "react";
import { Content } from "./styles";

export default function Body({ children } : { children : ReactNode})
{
    return (
        <>
            <Content>
                {children}
            </Content>
        </>
    )
}