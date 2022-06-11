import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { login } from '@/actions/auth';
import LoadingScreen from '@/components/common/LoadingScreen';
import type { AppThunkDispatch } from '@/types';
import AuthRouter from './AuthRouter';
import JournalRouter from './JournalRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const { uid, displayName, photoURL } = user;
        dispatch(login(uid, displayName, photoURL));
        // dispatch(startLoadNotes());
        setIsAuthenticated(true);
      } else {
        // User is signed out
        setIsAuthenticated(false);
      }
      setChecking(false);
    });

    // unsubscribe on unmount
    return subscriber;
  }, [dispatch]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <JournalRouter />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
