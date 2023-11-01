import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Signup from './views/Signup/Signup';
import './global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router= createBrowserRouter([
    {
        path: '/',
        element: <h1>Home</h1> 
    },
    {
        path: '/signup',
        element:<Signup/>
    }
])

root.render(<RouterProvider router={router} />)