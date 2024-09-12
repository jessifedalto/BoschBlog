import { FormEvent, useContext, useState } from "react";
import { ButtonContent, LinkContent, StyledButton, StyledContent, StyledForm, StyledInput, StyledLabel, StyledLink, Title } from "./styles";
import { ThemeContext } from "../../../context/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Forms() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { theme } = useContext(ThemeContext);

    async function handleClick(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login",
                {
                    email: email,
                    password: password
                }
            )

            if (res.status === 200 && res.data.token) {
                sessionStorage.setItem("token", res.data.token);
                setEmail("");
                setPassword("");
                navigate("/main");
                toast.success("Login succeeded");
            }
            else {
                toast.error("Failed to login")
            }
        }
        catch (error) {
            toast.error("An error occurred. Please try again")
            console.log(error);
        }
    }

    return (
        <>
            
                <StyledForm theme={theme} onSubmit={(e) => handleClick(e)}>
                    <StyledContent>
                        <Title>Login</Title>
                        <StyledLabel>Email:</StyledLabel>
                        <StyledInput
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Digite seu email"
                            required
                        />
                        <StyledLabel>Senha:</StyledLabel>
                        <StyledInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Digite sua senha"
                            required
                        />
                        <LinkContent>
                            <StyledLink to="/register">Não tenho uma conta</StyledLink>
                        </LinkContent>
                        <ButtonContent>
                            <StyledButton type="submit">ENTRAR</StyledButton>
                        </ButtonContent>
                    </StyledContent>
                </StyledForm>
        
        </>
    )
}