import createBrowserRouter, { createBrowserRouter } from 'react-router-dom';
import { path } from '../../../backend';
import App from '../App';
import Home from '../components/Home';

const router = new createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path:"/",
                element : <Home/>
            }
        ]
    }
])

export default router;