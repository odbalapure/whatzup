// const API_BASE = process.env.REACT_APP_API_URL;
const API_BASE =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : process.env.REACT_APP_API_URL;

export async function Api(
  endpoint,
  type = "GET",
  body = {},
  authNeeded = false
) {
  const url = `${API_BASE}/api/v1/${endpoint}`;
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (authNeeded) {
    const authData = JSON.parse(localStorage.getItem("whatzup_user"));
    const { token } = authData;
    header["Authorization"] = token;
  }
  const opts = { method: type, headers: header };
  if (type !== "GET" && body) {
    opts["body"] = JSON.stringify(body);
  }
  
  const response = await fetch(url, opts);
  const data = await response.json();

  const isLoginPage = window.location.pathname === "/login";
  if (!isLoginPage && data?.error === "Unauthorized") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/login");
  }

  return data;
}
