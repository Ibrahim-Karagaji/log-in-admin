export default function deleteUsersService(id) {
  const result = fetch(
    ` https://log-in-server-qd74.onrender.com/admin/users/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    }
  )
    .then(async (resaponse) => {
      const data = await resaponse.json();
      if (!resaponse.ok) {
        throw new Error(data.message || resaponse.statusText);
      }
      return data;
    })
    .catch((error) => {
      return { error: true, message: error.message || "Failed to delete user" };
    });
  return result;
}
