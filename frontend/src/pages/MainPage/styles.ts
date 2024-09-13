import styled from "styled-components";

export const ButtonDiv = styled.div`
    width: 100%;
    height: 40px;
    height: min-content;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 15px;
`

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalContent = styled.div`
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
    text-align: center;
`;

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
    gap: 15px;
`

export const StyledLabel = styled.label`
    display: flex;
    font-size: large;
    padding-left: 45px;
    align-self: flex-start;
`

export const HeaderModal = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const Image = styled.img`
    height: 25%;
    padding: 20px;
    cursor: pointer;
`