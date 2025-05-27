import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className=" pt-40 flex flex-col items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold mb-4">404</h1>
                <p className="text-2xl mb-6">
                    ¡Oops! La página que buscas no existe.
                </p>
                <p className="text-lg mb-6">
                    Es posible que el enlace esté roto o que la página haya sido eliminada.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
                >
                    Volver a Inicio
                </Link>
            </div>

        </div>
    );
}
