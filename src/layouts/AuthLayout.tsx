import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg5.svg')" }}>
            <div className="py-10 lg:py-20 mx-auto w-[450px] ">
            <Link to={'/auth/login'}>
                  <h1 className="text-white font-bold text-5xl text-center" >TaskManager</h1>
                  {/* <Logo/> */}
                  </Link>
                <div>
                    <Outlet />
                </div>
            </div>
            <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
        </div>
    );
}
