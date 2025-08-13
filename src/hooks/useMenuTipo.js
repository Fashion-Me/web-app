import { useState, useEffect } from "react";

const useMenuTipo = (completo) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuTipo, setMenuTipo] = useState(() => {
        const width = window.innerWidth;
        if (width <= 500) return "mobile";
        if (width <= 800) return "simples";
        return "";
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (completo !== false) {
                if (width <= 500) {
                    setMenuTipo("mobile");
                } else if (width <= 800) {
                    setMenuTipo("simples");
                } else {
                    setMenuTipo("");
                }
            } else {
                if (width <= 500) {
                    setMenuTipo("mobile");
                } else {
                    setMenuTipo("simples");
                }
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { menuTipo, menuOpen, setMenuOpen };
};

export default useMenuTipo;
