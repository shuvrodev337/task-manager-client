import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme,setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme'): 'light')


    useEffect(()=>{
        localStorage.setItem('theme',theme)
        const currentTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', currentTheme)

    },[theme])
    return [theme,setTheme]
};

export default useTheme;