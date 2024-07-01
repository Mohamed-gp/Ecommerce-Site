import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-hot-toast";

export default function Register() {
  const [username, setusername] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const submiteHandler = async (e) => {
    e.preventDefault();
    if (email.trim() == "") {
      return toast.error("email is required");
    }
    if (username.trim() == "") {
      return toast.error("username is required");
    }
    if (password.trim() == "") {
      return toast.error("password is required");
    }
    try {
      const { data } = await axios.post("http://localhost:3000/auth/register", {
        username,
        email,
        password,
      });
      console.log(data);
    } catch (error : any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };


  return (
    <>
      <div className="flex items-center justify-center">
        <div
          style={{
            minHeight: "calc(100vh - 70.94px)",
            boxShadow: "rgb(255 255 255 / 30%) 0px 0px 74px 55px",
          }}
          className="flex h-full  w-auto flex-col justify-center  px-6 md:w-1/2"
        >
          <p className="text-xl font-bold">Sign Up</p>
          <p className="text-sm">
            Sign up for free to access to in any of our products{" "}
          </p>
          <button
            className="my-2 flex w-full justify-center gap-2 rounded-xl   border-2 py-2 text-mainColor"
          >
            <img src="/Google.svg" alt="google" width={20} height={20} />
            <p>Continue With Google</p>
          </button>
          <div className="or-sign-up relative my-2 text-center  ">
            <span className="relative z-20 mx-auto  bg-white px-2 font-bold">
              OR
            </span>
          </div>
          <form action="" className="flex flex-col" onSubmit={submiteHandler}>
            <label htmlFor="username">Username : </label>
            <input
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              type="text"
              id="username"
              className="mb-2 mt-1 rounded-lg border-2 py-1 pl-2 focus:outline-none"
            />

            <label htmlFor="email">Email : </label>
            <input
              value={email}
              type="email"
              id="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="mb-2 mt-1 rounded-lg border-2 py-1 pl-2 focus:outline-none"
            />
            <div className="flex justify-between">
              <label htmlFor="email" className="">
                Password
              </label>
              <div className="mr-2 flex cursor-pointer gap-2 text-lg opacity-60">
                <FaEyeSlash />
              </div>
            </div>
            <input
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              id="password"
              className="mb-2 mt-1 rounded-lg border-2 py-2 pl-2 focus:outline-none"
            />
            <span className="mb-2 mt-1 text-center text-bgColorDanger opacity-50">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>
            <button
              type="submit"
              className="mx-auto w-fit rounded-xl bg-mainColor px-6 py-2 text-xl font-bold text-white"
            >
              Sign Up
            </button>
            <div className="mt-2 flex items-center justify-center gap-2">
              <p className="opacity-50">Already Have An Account ? </p>
              <Link to="/login" className="text-mainColor underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
        <div
          className="hidden h-full w-1/2 md:block"
          style={{
            minHeight: "calc(100vh - 70.94px)",
            backgroundImage: `url(/${"purple-wallpaper-with-swirly-background.jpg"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </>
  );
}
