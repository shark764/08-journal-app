import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <>
      <h3 className="auth__title mb-5">Login</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="email"
          placeholder="email@company.com"
          className="auth__input"
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          className="auth__input"
        />

        <button type="submit" className="btn btn-primary btn-block">
          Log In
        </button>

        <div className="auth__social-networks pt-5 pb-5">
          <p>Login with social networks</p>

          <div className="google-btn">
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
