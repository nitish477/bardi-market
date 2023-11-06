import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Signup from './views/Signup/Signup';
import './global.css'
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import Order from './views/Order/Order';
import BuyPage from './views/BuyPage/BuyPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router= createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/signup',
        element:<Signup/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/order',
        element: <Order/>
    },
    {
        path: '/buynow/:id',
        element: <BuyPage/>
    }
])

root.render(<RouterProvider router={router} />)