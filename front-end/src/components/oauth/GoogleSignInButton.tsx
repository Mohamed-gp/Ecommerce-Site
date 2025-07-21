import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth, firebaseReady } from "../../fireBase";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import customAxios from "../../utils/axios/customAxios";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useState } from "react";

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      // Wait for Firebase to be initialized with config from backend
      await firebaseReady();

      // Ensure auth is initialized before using it
      if (!auth) {
        throw new Error("Firebase auth not initialized");
      }

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await customAxios.post("/auth/google", {
        uid: user.uid,
        email: user.email,
        username: user.displayName, // Match backend expected field name
        photoUrl: user.photoURL, // Match backend expected field name
      });

      // Handle successful authentication
      dispatch(authActions.login(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Successfully signed in with Google!");
      navigate("/");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error(error?.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
      disabled={isLoading}
      className={`my-2 flex w-full justify-center gap-2 rounded-xl border-2 py-2 text-mainColor ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? (
        <span className="animate-spin">⌛</span>
      ) : (
        <FcGoogle size={20} />
      )}
      <p>{isLoading ? "Signing in..." : "Continue With Google"}</p>
    </button>
  );
};

export default GoogleSignInButton;
