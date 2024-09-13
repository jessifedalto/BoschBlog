import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledForm = styled.form<{theme: "dark" | "light"}>`
    width: 500px;
    background-color: #F06060;
    height: 500px;
    border: 4px solid;
    border-color: ${({ theme }) => (theme === "dark" ? "white": "black")};
    border-radius: 25px;
`

export const Title = styled.h1`
    font-weight: bolder;
    font-size: xx-large;
    display: flex;
    justify-content: center;
    padding: 40px;
`

export const StyledInput = styled.input`
    width: 400px;
    height: 30px;
    border: 2px black solid;
    border-radius: 10px;
    align-self: center;
    padding: 5px;
`

export const StyledContent = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 3px;
`

export const StyledLabel = styled.label`
    display: flex;
    font-size: large;
    padding-left: 45px;
    align-self: flex-start;
`

export const StyledButton = styled.button`
    width: 150px;
    height: 35px;
    background-color: #D94F04;
    color: white;
    border: 1px black solid;
    border-radius: 35px;
    text-align: center;
`

export const ButtonContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items:center;
`

export const StyledLink = styled(Link)`
    color: white;
    padding-left: 45px;
    text-decoration: underline;
    font-weight: normal;
    display: flex;
    align-self: flex-end;
`;

export const LinkContent = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    align-items: end;
`