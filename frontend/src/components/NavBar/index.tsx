import { ThemeContext } from "../../context/theme";
import { StyledHeader, Image, StyledLink } from "./styles"
import { useContext } from "react";

export default function NavBar() {

    const { image, toggleTheme } = useContext(ThemeContext)
    return (
        <>
            <StyledHeader>
                <StyledLink to='/'>
                    <Image src="bosch.png" />
                </StyledLink>
                <p>Bosch Blog</p>
                <Image src={image} onClick={() => toggleTheme()}></Image>
            </StyledHeader>
        </>
    )
}