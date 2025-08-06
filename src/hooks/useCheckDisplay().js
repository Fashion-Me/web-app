import {useEffect} from "react";

const useCheckDisplay = (divConfig,areaConfig) => {
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                const divConfig = document.querySelector('#divConfig');
                const areaConfig = document.querySelector('.AreaConfig');

                if (divConfig && areaConfig) {
                    const divConfigDisplay = window.getComputedStyle(divConfig).display;
                    const areaConfigDisplay = window.getComputedStyle(areaConfig).display;

                    if (divConfigDisplay === 'none' || areaConfigDisplay === 'none') {
                        divConfig.style.display = 'flex';
                        areaConfig.style.display = 'flex';
                    }
                }
            }
        };

        // Executa ao montar o componente
        handleResize();

        // Adiciona o listener de redimensionamento
        window.addEventListener('resize', handleResize);

        // Remove o listener ao desmontar o componente
        return () => window.removeEventListener('resize', handleResize);
    }, []);
};

export default useCheckDisplay;