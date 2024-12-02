import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { UpdateCurrentUserPasswordForm } from "@/types/index";
import { changePassword } from "@/api/ProfileAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function ChangePasswordView() {
    const initialValues: UpdateCurrentUserPasswordForm = {
        current_password: "",
        password: "",
        password_confirmation: "",
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            toast.success("Password updated successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const password = watch("password");

    const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) =>
        mutate(formData);

    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-black ">Cambiar Password</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Utiliza este formulario para cambiar tu password
                </p>

                <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="current_password"
                        >
                            Current password
                        </label>
                        <input
                            id="current_password"
                            type="password"
                            placeholder="Current password"
                            className="w-full p-3  border border-gray-200"
                            {...register("current_password", {
                                required: "The current password is required",
                            })}
                        />
                        {errors.current_password && (
                            <ErrorMessage>
                                {errors.current_password.message}
                            </ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >
                            New password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="New password"
                            className="w-full p-3  border border-gray-200"
                            {...register("password", {
                                required: "The new password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "The password must be at least 8 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>
                                {errors.password.message}
                            </ErrorMessage>
                        )}
                    </div>
                    <div className="mb-5 space-y-3">
                        <label
                            htmlFor="password_confirmation"
                            className="text-sm uppercase font-bold"
                        >
                            Password confirmation
                        </label>

                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="Password confirmation"
                            className="w-full p-3  border border-gray-200"
                            {...register("password_confirmation", {
                                required: "This field is required",
                                validate: (value) =>
                                    value === password ||
                                    "The passwords must match",
                            })}
                        />
                        {errors.password_confirmation && (
                            <ErrorMessage>
                                {errors.password_confirmation.message}
                            </ErrorMessage>
                        )}
                    </div>

                    <input
                        type="submit"
                        value="Change password"
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
}
