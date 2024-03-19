import { useState, useEffect } from "react";

import logo1 from "../assets/logos/logo1.png";
import logo2 from "../assets/logos/logo2.png";
import logo3 from "../assets/logos/logo3.png";
import logo4 from "../assets/logos/logo4.png";

/**
 * gets logo from assets
 * @param {string} inputLogo from database
 * @returns actual logo asset from assets folder
 */
const useGetLogo = (inputLogo) => {
    const [logo, setLogo] = useState(null);

    useEffect(function fetchLogo() {
        switch (inputLogo) {
            case "/logos/logo1.png":
                setLogo(logo1);
                break;
            case "/logos/logo2.png":
                setLogo(logo2);
                break;
            case "/logos/logo3.png":
                setLogo(logo3);
                break;
            case "/logos/logo4.png":
                setLogo(logo4);
                break;
        };
    }, [])

    return logo;
};

export default useGetLogo;