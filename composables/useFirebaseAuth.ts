import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const useFirebaseAuth = () => {
  const { $auth } = useNuxtApp();

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        $auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut($auth);
    await navigateTo("/login");
  };

  const currentUserPromise = () =>
    new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged($auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });

  const infoCurrentUser = $auth.currentUser;

  return {
    register,
    login,
    logout,
    currentUserPromise,
    infoCurrentUser,
  };
};
