import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";


const darkModeContext = createContext()

function DarkModeProvider({children}){
    const [isDarkMode, setDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme: dark)').matches, "isDarkMode");

    function toggleDarkMode(){
        setDarkMode((isDark)=>!isDark)
    }

    useEffect(function(){
        if(isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        }
        if(!isDarkMode) {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");
        }
    }, [isDarkMode])

    return <darkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>{children}</darkModeContext.Provider>
}

function useDarkMode(){
    const context = useContext(darkModeContext);
    if (context === undefined) throw new Error("Error. darkModeContext used outside of darkModeContext.Provider");
    return context
}

export { DarkModeProvider, useDarkMode }