import React from "react";
import { toast } from "react-toastify";


//Params: String: notification text
//Returns: A toast notification with the desired text

function Notification(String: String) {
  return toast.success(String, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

export default Notification;
