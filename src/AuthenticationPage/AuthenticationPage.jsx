import { useRef, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { SignInForm } from "../components/AuthenticationForms/SignInForm";
import { SignUpForm } from "../components/AuthenticationForms/SignUpForm";
import { CustomAlert } from "../components/Alert/CustomAlert";
import { ReactComponent as Wave } from "../assets/wave.svg";
import { auth } from "../../config/firebaseConfig";
import "./AuthenticationPage.scss";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(true);
  const [verified, setVerification] = useState(true);

  const verificationAlertMessage = `An email was send to your inbox requesting for verification. 
  Please verify your email and log in.`;

  const sendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setVerification(false);
      })
      .catch((error) => {
        setError(error.message);
        setShowAlert(true);
      });
  };

  const email = useRef("");
  const setEmail = (e) => {
    email.current = e.target.value;
  };

  const password = useRef("");
  const setPassword = (e) => {
    password.current = e.target.value;
  };

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email.current, password.current)
      .then(() => {
        setLogin(true);
        sendVerificationEmail();
      })
      .catch((error) => {
        setError(error.message);
        setShowAlert(true);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    setError(null);
    signInWithEmailAndPassword(auth, email.current, password.current)
      .then(({ user }) => {
        user.emailVerified ? navigate("/") : setVerification(false);
      })
      .catch((error) => {
        setError(error.message);
        setShowAlert(true);
      });
  };

  return (
    <div className="authentication-page">
      <div className="authentication-page--outter-shadow">
        <div className="authentication-page__form">
          <div className="authentication-page__form__menu">
            <ul>
              <li>
                <div onClick={() => setLogin(true)}>Log In to your account</div>
              </li>
              <li>
                <div onClick={() => setLogin(false)}>Create a new account</div>
              </li>
            </ul>
          </div>
          <div className="authentication-page__form__wrapper">
            {login ? (
              <SignInForm
                signIn={signIn}
                email={email.current.value}
                password={password.current.value}
                setEmail={setEmail}
                setPassword={setPassword}
              />
            ) : (
              <SignUpForm
                signUp={signUp}
                email={email.current.value}
                password={password.current.value}
                setEmail={setEmail}
                setPassword={setPassword}
              />
            )}
            {!verified && (
              <CustomAlert
                message={verificationAlertMessage}
                variant="dark"
                show={showAlert}
                setShowAlert={() => setShowAlert(false)}
              />
            )}
            {error && (
              <CustomAlert
                message={error}
                variant="warning"
                show={showAlert}
                setShowAlert={() => setShowAlert(false)}
              />
            )}
          </div>
        </div>
      </div>
      <Wave className="authentication-page--wave" />
    </div>
  );
};

export { AuthenticationPage };
