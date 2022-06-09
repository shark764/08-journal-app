import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
  isAuthenticated: boolean;
}

const PublicRoute = ({ children, isAuthenticated = false }: Props) =>
  isAuthenticated ? <Navigate to="/" /> : children;

export default PublicRoute;
