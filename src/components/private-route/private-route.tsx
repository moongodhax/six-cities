import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
	children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = false; // temporary hardcoded value

  return authorizationStatus ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
