import { Outlet } from 'react-router-dom';

export default function Layout () {
    return (
        <main className="container-fluid main-props position-relative">
            <Outlet />
        </main>
    )
}
