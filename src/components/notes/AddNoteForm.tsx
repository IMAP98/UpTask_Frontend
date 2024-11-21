import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export const AddNoteForm = () => {
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const projectId = params.projectId!;
    const taskId = queryParams.get("viewTask")!;

    const initialValues: NoteFormData = {
        content: "",
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ["task", taskId] });
        },
    });

    const handleAddNote = (formData: NoteFormData) => {
        mutate({ formData, projectId, taskId });
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-bold">
                    Create note
                </label>
                <input
                    id="content"
                    type="text"
                    className="w-full p-3 bg-white border border-gray-300"
                    {...register("content", {
                        required: "The content is required.",
                    })}
                    placeholder="Write your note here..."
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input
                type="submit"
                value="Add note"
                className="w-full p-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold cursor-pointer"
            />
        </form>
    );
};
