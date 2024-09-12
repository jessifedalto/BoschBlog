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
    padding: 50px;
`

export const StyledInput = styled.input`
    width: 400px;
    height: 20px;
    border: 2px black solid;
    border-radius: 5px;
    align-self: start;
`

export const StyledInputs = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
`

export const StyledLabel = styled.div`
    display: flex;
    justify-self: center;
    align-self: start;
`

export const StyledButton = styled.button`
    display: flex;
    background-color: blue;
`