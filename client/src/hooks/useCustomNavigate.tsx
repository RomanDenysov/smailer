import { useNavigate, useLocation } from "react-router-dom";

const useCusomNavigate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/'

    const customNavigate = (options = {replace: true}) => {
        navigate(fromPage, options);
    };

    return customNavigate;
};

export default useCusomNavigate;