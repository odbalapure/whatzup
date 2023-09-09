import toast from "react-hot-toast";
import "../index.css";

const showToast = (
  msg,
  type = "success",
  options = { position: "top-right" },
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

export default function isEmpty(value) {
  if (value == null) {
    return true;
  }
  const valueType = typeof value;
  if (Array.isArray(value) || valueType === "string") {
    return value.length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype === null || prototype === Object.prototype) {
    return Object.keys(value).length === 0;
  }
  return true;
}

const isAdmin = () => {
  if (localStorage.getItem("whatzup_user")) {
    const user = JSON.parse(localStorage.getItem("whatzup_user"));
    return user?.role === "admin";
  }
  return false;
};

export { showToast, isAdmin };
