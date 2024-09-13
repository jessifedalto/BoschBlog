import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Body from "./components/Body";
import MainNavBar from "./components/MainNavBar";
import Table from "./components/List";
import { ButtonDiv, HeaderModal, ModalContent, ModalOverlay, StyledContent, StyledForm, StyledInput, StyledLabel, Title, Image } from "./styles";
import { ThemeContext } from "../../context/theme";
import axios from "axios";
import { toast } from "react-toastify";

export default function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    async function handleClick(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const id = sessionStorage.getItem("id");

        try {
            const res = await axios.post("http://localhost:8080/api/article/",
                {
                    title: title,
                    text: text,
                    authorid: id,
                    createdAt: Date.now()
                }
            )

            if (res.status === 201) {
                setTitle("");
                setText("");
                closeModal();
            }
        }
        catch (error) {
            console.log(error);

            if(error.response.data.message)
                toast.error(error.response.data.message);
            else    
                toast.warning(error.message);
        }
    }

    return (
        <>
            <MainNavBar />
            <Body>
                <ButtonDiv>
                    <Button onClick={openModal}>Adicionar Artigo</Button>
                </ButtonDiv>
                <Table />

                {isModalOpen && (
                    <ModalOverlay>
                        <ModalContent>
                            <StyledForm theme={theme} onSubmit={(e) => handleClick(e)}>
                                <StyledContent>
                                    <HeaderModal>
                                        <Title>Artigo</Title>
                                        <Image src="close.png" onClick={closeModal} alt="" />
                                    </HeaderModal>
                                    <StyledLabel>Título:</StyledLabel>
                                    <StyledInput
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        type="text"
                                        placeholder="Digite um título"
                                        required
                                    />
                                    <StyledLabel>Texto:</StyledLabel>
                                    <StyledInput
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        type="text"
                                        placeholder="Digite o texto"
                                        required
                                    />
                                    <Button style={{margin: 0}} type="submit">Salvar Artigo</Button>
                                </StyledContent>
                            </StyledForm>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </Body>

        </>
    )
}