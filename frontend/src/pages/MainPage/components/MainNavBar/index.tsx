import { ThemeContext } from "../../../../context/theme";
import { StyledHeader, Image, StyledLink } from "./styles"
import { useContext } from "react";

export default function MainNavBar() {

    const { image, toggleTheme } = useContext(ThemeContext)
    return (
        <>
            <StyledHeader>
                <StyledLink to='/'>
                    <Image src="bosch.png" />
                </StyledLink>
                <p>Bosch Blog</p>
                <Image src={image} onClick={() => toggleTheme()}></Image>
                <Image src="logout.png" onClick={() => toggleTheme()}></Image>
            </StyledHeader>
        </>
    )
}