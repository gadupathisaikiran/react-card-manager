import { Routes, Route, Navigate, useNavigate, useLocation,BrowserRouter} from 'react-router-dom';

import { history } from '_helpers';
import { Nav, PrivateRoute } from '_components';
import { Home } from 'home';
import { Login } from 'login';
import Cards from 'home/cards';
import Newcard from 'home/newcard';
import CardS from 'home/cards';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
            
                <Routes>
                <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    
                    <Route path="/cards" element={<CardS/>} />
                    <Route path="/cards/new" element={<Newcard />} />
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={<Home/>} />
                    
                 
                </Routes>
            </div>
        </div>
    );
}
