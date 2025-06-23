export default function signinAdminService(info) {
  const result = fetch(
    " https://log-in-server-qd74.onrender.com/admin/log-in",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    }
  )
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }
      return data;
    })
    .catch((error) => {
      return { error: true, message: error.message || "Failed to sign in" };
    });
  return result;
}
