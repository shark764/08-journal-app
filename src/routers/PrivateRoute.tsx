import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
  isAuthenticated: boolean;
}

const PrivateRoute = ({ children, isAuthenticated = false }: Props) =>
  isAuthenticated ? children : <Navigate to="auth" />;

export default PrivateRoute;
