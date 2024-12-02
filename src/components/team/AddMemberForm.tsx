import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";
import { SearchResult } from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: "",
    };
    const params = useParams();
    const projectId = params.projectId!;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const mutation = useMutation({
        mutationFn: findUserByEmail,
    });

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = { projectId, formData };
        mutation.mutate(data);
    };

    const resetData = () => {
        reset();
        mutation.reset();
    };

    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >
                <div className="flex flex-col gap-3">
                    <label className="font-normal text-2xl" htmlFor="name">
                        User E-mail
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail address of the user to add"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "The email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer"
                    value="Search user"
                />
            </form>
            {mutation.isPending && (
                <div className="mt-10 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-fuchsia-500"></div>
                </div>
            )}
            {mutation.error && (
                <div className="mt-10 flex justify-center">
                    <p>{mutation.error.message}</p>
                </div>
            )}
            {mutation.data && (
                <SearchResult user={mutation.data} reset={resetData} />
            )}
        </>
    );
}