"use client";
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalSlice";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";

function AuthModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, flow } = useSelector(
    (state: { modal: { isOpen: boolean; flow: string } }) => state.modal,
  );

  // LOGIN/SIGN UP
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setLoadingButton("form");

    if (!email || !password) {
      setError("Please fill all fields");
      setIsLoading(false);
      setLoadingButton("");

      return;
    }

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      setEmail("");
      setPassword("");
      setError("");
      dispatch(closeModal());

      if (flow !== "payment") {
        router.push("/for-you");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
      setLoadingButton("");
    }
  };

  if (!isOpen) return null;

  // GUEST LOGIN
  async function handleGuestLogin() {
    setError("");
    setIsLoading(true);
    setLoadingButton("guest");

    try {
      await signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123");

      dispatch(closeModal());
      router.push("/for-you");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
      setLoadingButton("");
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setIsLoading(true);
    setLoadingButton("google");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      dispatch(closeModal());

      if (flow !== "payment") {
        router.push("/for-you");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
      setLoadingButton("");
    }
  }

  // RESET PASSWORD
  async function handleResetPassword() {
    setError("");
    setSuccess("");
    setIsLoading(true);
    setLoadingButton("reset");

    if (!email) {
      setError("Please enter your email");
      setIsLoading(false);
      setLoadingButton("");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent. Check your inbox.");
      setEmail("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
      setLoadingButton("");
    }
  }

  return (
    <div id="auth-modal">
      <div className="wrapper__modal">
        <div className="overlay overlay--hidden"></div>
        <div className="auth__wrapper">
          <div className="auth">
            <div className="auth__content">
              <div className="auth__title">
                {mode === "login"
                  ? "Log in to Summarist"
                  : mode === "signup"
                    ? "Sign up to Summarist"
                    : "Reset your password"}
              </div>
              {error && <div className="auth__error">{error}</div>}
              {success && <div className="auth__success">{success}</div>}

              {mode === "reset" ? (
                <>
                  <form className="auth__main--form">
                    <input
                      className="auth__main--input"
                      type="text"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                      className="btn"
                      type="button"
                      onClick={handleResetPassword}
                      disabled={loadingButton === "reset"}
                    >
                      <span>
                        {loadingButton === "reset" ? (
                          <div className="spinner"></div>
                        ) : (
                          "Send reset password link"
                        )}
                      </span>
                    </button>
                  </form>
                </>
              ) : (
                <>
                  {mode === "login" && flow !== "payment" && (
                    <>
                      <button
                        className="btn guest__btn--wrapper"
                        onClick={handleGuestLogin}
                        disabled={loadingButton === "guest"}
                      >
                        <figure className="google__icon--mask guest__icon--mask">
                          <FaUser size={24} />
                        </figure>
                        <div>
                          {loadingButton === "guest" ? (
                            <div className="spinner"></div>
                          ) : (
                            "Login as Guest"
                          )}
                        </div>
                      </button>

                      <div className="auth__separator">
                        <span className="auth__separator--text">or</span>
                      </div>
                    </>
                  )}

                  <button
                    className="btn google__btn--wrapper"
                    onClick={handleGoogleLogin}
                    disabled={loadingButton === "google"}
                  >
                    <figure className="google__icon--mask">
                      <img src="/google.png" alt="" />
                    </figure>
                    <div>
                      {loadingButton === "google" ? (
                        <div className="spinner"></div>
                      ) : mode === "login" ? (
                        "Login with Google"
                      ) : (
                        "Sign up with Google"
                      )}
                    </div>
                  </button>

                  <div className="auth__separator">
                    <span className="auth__separator--text">or</span>
                  </div>

                  <form className="auth__main--form" onSubmit={handleSubmit}>
                    <input
                      className="auth__main--input"
                      type="text"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="auth__main--input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      className="btn"
                      type="submit"
                      disabled={loadingButton === "form"}
                    >
                      <span>
                        {loadingButton === "form" ? (
                          <div className="spinner"></div>
                        ) : mode === "login" ? (
                          "Login"
                        ) : (
                          "Sign up"
                        )}
                      </span>
                    </button>
                  </form>
                </>
              )}
            </div>

            {mode === "login" && (
              <div
                className="auth__forgot--password"
                onClick={() => {
                  setMode("reset");
                  setError("");
                  setSuccess("");
                }}
              >
                Forgot your password?
              </div>
            )}

            {mode !== "reset" && (
              <button
                className="auth__switch--btn"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setError("");
                }}
              >
                {mode === "login"
                  ? "Don’t have an account?"
                  : "Already have an account?"}
              </button>
            )}

            {mode === "reset" && (
              <button
                className="auth__switch--btn"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
              >
                Go to login
              </button>
            )}

            <div
              className="auth__close--btn"
              onClick={() => dispatch(closeModal())}
            >
              <IoClose size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
