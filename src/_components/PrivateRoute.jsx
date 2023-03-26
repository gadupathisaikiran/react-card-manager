import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const { user: authUser } = useSelector(x => x.auth);
    
    if (!sessionStorage.getItem("token")) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" state={{ from: history.location }} />
    }

    // authorized so return child components
    return children;
}