import { FormEvent, useContext, useState } from "react";
import Main from "../../../components/Main";
import NavBar from "../../../components/NavBar";
import { StyledButton, StyledForm, StyledInput, StyledInputs, StyledLabel, Title } from "./styles";
import { ThemeContext } from "../../../context/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Forms() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { theme } = useContext(ThemeContext);

    async function handleClick(e : FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", 
                {
                    email : email,
                    password: password
                }
            )

            // if (res.data ===) {
                
            // }

            sessionStorage.setItem("token", res.data.token);

            setEmail("");
            setPassword("");
            navigate("/teste");
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NavBar />
            <Main>
                <StyledForm theme={theme} onSubmit={(e) => handleClick(e)}>
                    <StyledInputs>
                        <Title>Login</Title>
                        <StyledLabel>Email:</StyledLabel>
                        <StyledInput
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Digite seu email"
                        />
                        <StyledLabel>Senha:</StyledLabel>
                        <StyledInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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