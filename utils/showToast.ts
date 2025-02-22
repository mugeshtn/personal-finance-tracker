import { toast } from "react-toastify";

export const showToast = (message: string, status: "error" | "success" | "warning" | "info" = "info"
) => {
    toast[status](message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    })
}