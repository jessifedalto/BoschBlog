import { FormEvent, useContext, useState } from "react";
import { ButtonContent, StyledButton, StyledContent, StyledForm, StyledInput, StyledLabel, Title } from "./styles";
import { ThemeContext } from "../../../../context/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AES } from "crypto-ts";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const { theme } = useContext(ThemeContext);

    async function handleClick(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const secretKey = import.meta.env.VITE_AES_SECRET as string;

        const encryptedName = AES.encrypt(name, secretKey).toString();
        const encryptedEmail = AES.encrypt(email, secretKey).toString();
        const encryptedBirth = AES.encrypt(birth, secretKey).toString();
        const encryptedPassword = AES.encrypt(password, secretKey).toString();
        const encryptedConfirm = AES.encrypt(confirmPass, secretKey).toString();

        try {
            const res = await axios.post("http://localhost:8080/api/person/register",
                {
                    name: encryptedName,
                    birth: encryptedBirth,
                    email: encryptedEmail,
                    password: encryptedPassword,
                    confirmPassword: encryptedConfirm,
                    createdAt: Date.now()
                }
            )

            if (res.status === 201) {
                setEmail("");
                setPassword("");
                navigate("/");
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
                    <Title>Registro</Title>
                    <StyledLabel>Nome:</StyledLabel>
                    <StyledInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Digite seu nome"
                        required
                    />
                    <StyledLabel>Email:</StyledLabel>
                    <StyledInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Digite seu email"
                        required
                    />
                    <StyledLabel>Data de nascimento:</StyledLabel>
                    <StyledInput
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                        type="date"
                        placeholder="Digite sua senha"
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
                    <StyledLabel>Confirme a Senha:</StyledLabel>
                    <StyledInput
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        type="password"
                        placeholder="Digite sua senha"
                        required
                    />
                    <ButtonContent>
                        <StyledButton type="submit">CADASTRAR</StyledButton>
                    </ButtonContent>
                </StyledContent>
            </StyledForm>

        </>
    )
}