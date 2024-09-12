import { createContext, ReactNode, useState } from "react";

interface ITheme {
    theme: "light" | "dark";
    image: "sun.png" | "moon.png",
    toggleTheme: () => void
}
export const ThemeContext = createContext({} as ITheme)

export const ThemeProvider = ({ children } :{children: ReactNode}) => {

    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [image, setImage] = useState<"sun.png" | "moon.png">("moon.png");
    
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        const newImage = image === "moon.png" ? "sun.png" : "moon.png"
        setTheme(newTheme);
        setImage(newImage);
        document.body.style.backgroundColor = newTheme === "dark" ? "#2f1313" : "#F2EBBF";
    };

    return(
        <ThemeContext.Provider
            value={{
                theme,
                image,
                toggleTheme
            }}
            children={ children }
        />
    )
}