import { Outlet } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

const Layout = () => {
    return (
        <main className="container-fluid main-props position-relative">
            <Outlet />
        </main>
    )
}

export default Layout