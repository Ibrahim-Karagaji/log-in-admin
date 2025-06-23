export default function getAllUserService() {
  const result = fetch(" https://log-in-server-qd74.onrender.com/admin/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }
      return data;
    })
    .catch((error) => {
      return { error: true, message: error.message || "Failed to sign in" };
    });
  return result;
}
