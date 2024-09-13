import { FormEvent, useContext, useState } from "react";
import { ButtonContent, LinkContent, StyledButton, StyledContent, StyledForm, StyledInput, StyledLabel, StyledLink, Title } from "./styles";
import { ThemeContext } from "../../../context/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AES } from "crypto-ts";

export default function Forms() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { theme } = useContext(ThemeContext);

    async function handleClick(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const secretKey = import.meta.env.VITE_AES_SECRET as string;

        const encryptedEmail = AES.encrypt(email, secretKey).toString();
        const encryptedPassword = AES.encrypt(password, secretKey).toString();
 
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login",
                {
                    email: encryptedEmail,
                    password: encryptedPassword
                }
            )

            console.log(res);
            if (res.status === 200 && res.data.token) {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("id", res.data.author);

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