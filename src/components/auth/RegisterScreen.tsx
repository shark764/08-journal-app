import type { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailAndPassword } from '@/actions/auth';
import { uiRemoveError, uiSetError } from '@/actions/ui';
import useForm from '@/hooks/useForm';
import type { AppState, AppThunkDispatch } from '@/types';
import type { RegisterFormValues } from '@/types/auth';
import Loading from '../common/Loading';

const RegisterScreen = () => {
  const errorMessage = useSelector((state: AppState) => state.ui.errorMessage);
  const isLoading = useSelector((state: AppState) => state.ui.loading);
  const dispatch: AppThunkDispatch = useDispatch();
  const [formValues, handleInputChange] = useForm<RegisterFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formValues;

  const setError = (errMsg: string) => {
    dispatch(uiSetError(errMsg));
  };

  const isFormValid = () => {
    if (validator.isEmpty(name)) {
      setError('Name cannot be empty');

      return false;
    }
    if (!validator.isEmail(email)) {
      setError('Not a valid email');

      return false;
    }
    if (validator.isEmpty(password)) {
      setError('Password cannot be empty');

      return false;
    }
    if (!validator.isLength(password, { min: 6 })) {
      setError('Not a strong password, min length is 6');

      return false;
    }
    if (!validator.equals(password, confirmPassword)) {
      setError('Passwords not matching');

      return false;
    }

    dispatch(uiRemoveError());

    return true;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailAndPassword(email, password, name));
    }
  };

  return (
    <>
      <h3 className="auth__title mb-5">Registration</h3>

      {Boolean(errorMessage) && (
        <div className="auth__alert-error">{errorMessage}</div>
      )}

      {isLoading && <Loading />}

      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="your name"
          className="auth__input"
          value={name}
          onChange={handleInputChange}
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          className="auth__input"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          disabled={isLoading}>
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
