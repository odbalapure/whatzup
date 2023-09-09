import toast from "react-hot-toast";

const showToast = (
  msg,
  type = "success",
  options = { position: 'top-right' },
  delay = 0
) => {
  setTimeout(() => {
    switch (type) {
      case "success":
        toast.success(msg, options);
        return;
      case "error":
        toast.error(msg, options);
        return;
      default:
        return;
    }
  }, delay);
};

export { showToast };
