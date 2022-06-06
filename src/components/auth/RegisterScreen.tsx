import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <>
      <h3 className="auth__title mb-5">Registration</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="your name"
          className="auth__input"
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          className="auth__input"
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
