import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { UserContext } from "../statesManagement/UserContextState";
import signinAdminService from "../services/signinAdminService";

export default function SignIn() {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const dialogRef = useRef(null);
  const errorMessgae = useRef(null);
  const navigate = useNavigate();

  const handleSignin = async () => {
    dialogRef.current.showModal();
    const result = await signinAdminService(inputValues);

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
      window.localStorage.setItem("token", `Bearer ${result.token}`);
      navigate("/");
    }
  };

  return (
    <div className="signin !bg-[#eee] grid grid-cols-2 !max-w-[900px] !h-full shadow-[0px_0px_12px_#2d11b7] rounded-[5px] !mr-auto !ml-auto !p-[2px] text-[#eee] ">
      <div className="bg-[#674ee6] rounded-tl-[5px] rounded-bl-[5px] !p-[3px] grid items-center content-center gap-5">
        <div className="text-center">
          <h1 className="font-bold !w-full">Hello</h1>
          <p>Please Complete Your Info</p>
        </div>
        <form
          onClick={(e) => {
            e.preventDefault();
          }}
          className="!w-full grid gap-5"
        >
          <label className="flex gap-2 !p-2 shadow-[0px_0px_12px_#eee] rounded-[20px] items-center !w-[90%] !mr-auto !ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z" />
            </svg>
            <input
              onInput={(e) => {
                setInputValues((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
              required
              type="email"
              placeholder="Your email"
              className="focus:outline-none focus:border-transparent !w-[100%] "
            />
          </label>
          <label className="flex gap-2 !p-2 shadow-[0px_0px_12px_#eee] rounded-[20px] items-center !w-[90%] !mr-auto !ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              fill="#eee"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
            </svg>
            <input
              onInput={(e) => {
                setInputValues((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
              type="password"
              required
              minLength={6}
              placeholder="Your password"
              className="focus:outline-none focus:border-transparent !w-[100%] "
            />
          </label>
          <button
            onClick={() => {
              handleSignin();
            }}
            className="!bg-[#eee] text-[#674ee6] rounded-[5px] font-semibold !w-fit !p-[5px_15px] !mr-auto !ml-auto shadow-[0px_0px_12px_#eee] hover:!bg-[#674ee6] hover:text-[#eee]  duration-300"
          >
            SIGN IN
          </button>
        </form>
        <div>
          <h1
            ref={errorMessgae}
            className="fixed bottom-10 left-[-300px] !p-[5px] rounded-[5px] !w-fit font-normal !text-[17px] duration-300"
          >
            Message
          </h1>
          <Loading dialogRef={dialogRef} />
        </div>
      </div>
      <div className="grid content-center items-cente text-center text-[#674ee6]">
        <h1 className=" font-bold">Welcome Admin</h1>
        <p>
          here as a admin you can see all the users and you can delete a user
        </p>
      </div>
    </div>
  );
}
