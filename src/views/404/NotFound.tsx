import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <>
            <h1 className="font-black text-center text-4xl text-white">
                Page not found
            </h1>
            <p className="mt-10 text-center  text-white">
                You may want to go back to{" "}
                <Link to="/" className="text-fuchsia-500">
                    Projects
                </Link>
            </p>
        </>
    );
};
