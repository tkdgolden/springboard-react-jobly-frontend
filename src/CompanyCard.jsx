import { Link } from "react-router-dom";
import useGetLogo from "./hooks/useGetLogo";

/**
 * displays basic company info in company list
 * @param {object} companyInfo { handle, name, description, numEmployees, logoUrl }
 * @returns component
 */
const CompanyCard = ({companyInfo}) => {
    const currLogo = useGetLogo(companyInfo.logoUrl);

    return (
        <>
            <div>
            <Link to={`/companies/${companyInfo.handle}`} >{companyInfo.name}</Link>
                <p>{companyInfo.description}</p>
            </div>
            <img src={currLogo} />

        </>
    );

};

export default CompanyCard