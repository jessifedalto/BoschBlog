import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../../context/theme";
import { StyledHeader, Image, StyledLink } from "./styles"
import { useContext } from "react";

export default function MainNavBar() {

    const { image, toggleTheme } = useContext(ThemeContext)
    const navigate = useNavigate();

    function logOut() {
        sessionStorage.clear();
        navigate("/");    
    }
    return (
        <>
            <StyledHeader>
                <StyledLink to='/'>
                    <Image src="bosch.png" />
                </StyledLink>
                <p>Bosch Blog</p>
                <Image src={image} onClick={() => toggleTheme()}></Image>
                <Image src="logout.png" onClick={() => logOut()}></Image>
            </StyledHeader>
        </>
    )
}