import { UserContext } from "../statesManagement/UserContextState";
import { useContext, useRef } from "react";
import Loading from "./Loading";
import deleteUsersService from "../services/deleteUsersService";

export default function AdminPanel() {
  const users = useContext(UserContext);
  const dialogRef = useRef(null);
  const errorMessgae = useRef(null);

  const handleDeleteUser = async (id) => {
    dialogRef.current.showModal();
    const result = await deleteUsersService(id);

    if (result.error) {
      dialogRef.current.close();
      errorMessgae.current.style.left = "10px";
      errorMessgae.current.style.backgroundColor = "red";
      errorMessgae.current.innerHTML = result.message;
      setTimeout(() => {
        errorMessgae.current.style.left = "-300px";
        errorMessgae.current.innerHTML = "";
      }, 3000);
      return;
    }

    if (result.ok) {
      dialogRef.current.close();
      errorMessgae.current.style.left = "10px";
      errorMessgae.current.style.backgroundColor = "green";
      errorMessgae.current.innerHTML = result.message;
      setTimeout(() => {
        errorMessgae.current.style.left = "-300px";
        errorMessgae.current.innerHTML = "";
      }, 3000);
      users.setUsers(users.users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="!mx-auto !p-1 !bg-[#eee] text-[#674ee6] rounded-[5px] shadow-[0_0_12px_#2d11b7] space-y-4 !mr-auto !ml-auto max-h-[90vh] overflow-hidden">
      <h1 className="text-center text-xl font-bold !bg-[#674ee6] text-[#eee] !p-2 rounded-[5px] shadow-[0_0_12px_#2d11b7]">
        Admin Panel
      </h1>
      <p className="text-center font-medium text-sm !px-2 !mb-2 !mt-2">
        list of all registered users in the system.
      </p>
      <div className="AdminPanel overflow-y-auto max-h-[75vh] grid gap-4 !mb-1 !p-2">
        {users.users.map((user, index) => (
          <div
            onClick={() => handleDeleteUser(user.id)}
            key={index}
            className="flex items-center gap-3 !bg-[#eee] text-[#674ee6] !p-1 rounded-[5px] shadow-[0_0_8px_#2d11b7]"
          >
            <img
              src="public/avatar.png"
              alt="avatar"
              className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#674ee6]"
            />
            <div className="flex-1">
              <p className="font-bold text-base">
                {index + 1}- {user.name}
              </p>
              <p className="text-sm break-words">{user.email}</p>
            </div>
            <button className="hover:scale-110 transition-transform">
              <svg
                className="w-[20px] h-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#674ee6"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <Loading dialogRef={dialogRef} />
      <h1
        ref={errorMessgae}
        className="fixed text-[#eee] bottom-10 left-[-300px] !p-[5px] rounded-[5px] !w-fit font-normal !text-[17px] duration-300"
      >
        Message
      </h1>
    </div>
  );
}
