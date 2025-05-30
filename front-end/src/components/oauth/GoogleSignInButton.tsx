import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../fireBase";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import customAxios from "../../utils/axios/customAxios";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await customAxios.post("/auth/google", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      // Handle successful authentication
      dispatch(authActions.login(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Successfully signed in with Google!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <button
      onClick={() => signInWithGoogle()}
      className="my-2 flex w-full justify-center gap-2 rounded-xl   border-2 py-2 text-mainColor"
    >
      <FcGoogle size={20} />
      <p>Continue With Google</p>
    </button>
  );
};

export default GoogleSignInButton;
