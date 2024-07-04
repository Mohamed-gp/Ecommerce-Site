import { Link, useParams } from "react-router-dom";
import { FaDoorOpen, FaPersonWalkingArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import customAxios from "../../utils/axios/customAxios";
import { useEffect, useState } from "react";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>();
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const { data } = await customAxios.get(`/users/${id}`);
      setUser(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUserInfo();
  });
  const logoutHandler = async () => {
    try {
      const { data } = await customAxios.post("/auth/logout");
      toast.success(data.message);
      dispatch(authActions.logout(null));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    dispatch(authActions.logout(null));
  };
  return (
    <>
      <div
        className="container py-16"
        style={{ minHeight: "calc(100vh - 70.94px)" }}
      >
        <div className="my-10 rounded-xl border-2 border-mainColor p-3">
          <p className="border-b-2 pb-1 font-bold">Account Settings</p>
          <div className="flex flex-col-reverse items-center justify-between gap-x-32 px-4 py-6 sm:flex-row">
            <div className="flex w-full flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="username">Username: </label>
                <input
                  className="w-full rounded-xl border-2 py-2 pl-3 pr-3 focus:outline-none"
                  id="username"
                  type="text"
                  placeholder={user?.username}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email:</label>
                <input
                  className="w-full rounded-xl border-2 py-2 pl-3 pr-3 focus:outline-none"
                  id="email"
                  type="text"
                  placeholder={user?.email}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="overflow-hidden rounded-full">
                <img
                  src="/worldface-spanish-guy-white-background.jpg"
                  width={200}
                  height={200}
                  alt="avatar"
                  className="rounded-full"
                />
              </div>
              {user?._id == id && (
                <>
                  <input type="file" id="image-change" className="hidden" />
                  <label
                    htmlFor="image-change"
                    className="w-[142px] cursor-pointer rounded-xl border-2 border-mainColor bg-white px-3 py-1 text-center font-bold text-mainColor"
                  >
                    Chose Image
                  </label>
                </>
              )}
            </div>
          </div>
          <button className="fit-content mx-auto flex rounded-xl bg-mainColor  px-4 py-2 text-white">
            Save Changes
          </button>
        </div>
        {user?.provider == "credentials" && user?._id == id && (
          <div className="my-10 rounded-xl border-2 border-mainColor p-3">
            <p className="border-b-2  pb-1 font-bold">Change Password</p>
            <div className="flex flex-col-reverse items-center justify-between gap-x-32 px-4 py-6 sm:flex-row">
              <div className="flex w-full flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="current-password">Current Password: </label>
                  <input
                    className="w-full rounded-xl border-2 py-2 pl-3 pr-3 focus:outline-none"
                    id="current-password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">New Password:</label>
                  <input
                    className="password-icon w-full rounded-xl border-2 py-2 pl-3 pr-3 focus:outline-none"
                    id="new-password"
                    type="password"
                    placeholder="Your New Password"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="Confirm-new-password">
                    Confirm New Password:
                  </label>
                  <input
                    className="password-icon w-full rounded-xl border-2 py-2 pl-3 pr-3 focus:outline-none"
                    id="confirm-new-password"
                    type="password"
                    placeholder="Your New Password"
                  />
                </div>
              </div>
            </div>
            <button className="fit-content mx-auto flex rounded-xl bg-mainColor  px-4 py-2 text-white">
              Change Password
            </button>
          </div>
        )}
        <div className="flex items-center justify-end">
          {user && (
            <button
              onClick={() => logoutHandler()}
              className="flex items-center gap-4 rounded-xl bg-mainColor px-6 py-2    text-white"
            >
              Logout
              <span className="text-2xl">
                <FaPersonWalkingArrowRight />
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default Profile;
