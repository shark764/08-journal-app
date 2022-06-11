import type { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  startLoginWithEmailAndPassword,
  startLoginWithGoogle,
} from '@/actions/auth';
import useForm from '@/hooks/useForm';
import type { AppState, AppThunkDispatch } from '@/types';
import type { LoginFormValues } from '@/types/auth';
import Loading from '../common/Loading';

const LoginScreen = () => {
  const errorMessage = useSelector((state: AppState) => state.ui.errorMessage);
  const isLoading = useSelector((state: AppState) => state.ui.loading);
  const dispatch: AppThunkDispatch = useDispatch();
  const [formValues, handleInputChange] = useForm<LoginFormValues>({
    email: '',
    password: '',
  });
  const { email, password } = formValues;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(startLoginWithEmailAndPassword(email, password));
  };

  const handleLoginWithGoogle = () => {
    dispatch(startLoginWithGoogle());
  };

  return (
    <>
      <h3 className="auth__title mb-5">Login</h3>

      {Boolean(errorMessage) && (
        <div className="auth__alert-error">{errorMessage}</div>
      )}

      {isLoading && <Loading />}

      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="email"
          placeholder="email@company.com"
          className="auth__input"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          className="auth__input"
          autoComplete="new-password"
          value={password}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isLoading}>
          Log In
        </button>

        <div className="auth__social-networks pt-5 pb-5">
          <p>Login with social networks</p>

          <div
            role="presentation"
            className="google-btn"
            onClick={handleLoginWithGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
