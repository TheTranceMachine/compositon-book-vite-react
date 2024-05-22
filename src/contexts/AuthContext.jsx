import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { CustomSpinner } from "../components/Spinner/CustomSpinner";
import { auth } from "../../config/firebaseConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });
  });

  return (
    <>
      {pending ? (
        <CustomSpinner className="bg-gray-950 h-[100vh]" height="200px" width="200px" />
      ) : (
        <AuthContext.Provider
          value={{
            currentUser,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export { AuthContext, AuthProvider };
