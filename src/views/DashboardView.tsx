import { Link } from "react-router-dom";

export const DashboardView = () => {
    return (
        <>
            <h1 className="text-5xl font-black">My projects</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">
                Handle your projects
            </p>

            <nav className="my-5">
                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    to={"/projects/create"}
                >
                    New project
                </Link>
            </nav>
        </>
    );
};
