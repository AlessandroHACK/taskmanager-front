import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg5.svg')" }}>
            <div className="py-8 lg:py-20 mx-auto w-full max-w-md px-4">
                <Link to={'/auth/login'}>
                    <h1 className="text-white font-bold text-4xl md:text-5xl text-center">TaskManager</h1>
                </Link>
                <div className="mt-6">
                    <Outlet />
                </div>
            </div>
            <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
        </div>
    );
}