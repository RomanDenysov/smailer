import { ReactElement } from 'react'
import {useLocation, Navigate} from 'react-router-dom'

interface RequireAuthProps {
    children: ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({children}) => {
    const location = useLocation();
    const auth = true;

    if(!auth) {
        return <Navigate to='/login' state={{from: location}}/>
    }

  return children;
}

export default RequireAuth