import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./styles";

interface IButtonProps {
    children: string;
}

export default function Button({children, ...props}: IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>)
{
    return (
        <>
            <StyledButton {...props}>
                {children}
            </StyledButton>
        </>
    )
}