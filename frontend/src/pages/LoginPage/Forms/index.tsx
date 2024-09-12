import { useContext } from "react";
import Main from "../../../components/Main";
import NavBar from "../../../components/NavBar";
import { StyledButton, StyledForm, StyledInput, StyledInputs, StyledLabel, Title } from "./styles";
import { ThemeContext } from "../../../context/theme";

export default function Forms() {
    
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <NavBar/>
            <Main>
                <StyledForm theme={theme}>
                    <StyledInputs>
                        <Title>Login</Title>
                        <StyledLabel>Username ou email:</StyledLabel>
                        <StyledInput 
                            type="text" 
                            placeholder="Digite seu email"
                        />
                        <StyledLabel>Senha:</StyledLabel>
                        <StyledInput 
                            type="password" 
                            placeholder="Digite sua senha"
                        />
                        <StyledButton>ME CLICA</StyledButton>
                    </StyledInputs>
                </StyledForm>
            </Main>
        </>
    )
}