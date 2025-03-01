import { ComponentType } from 'react';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/user-process.selectors';

type WithAuthInfoProps = {
    authorizationStatus: string;
    userData: {
        id: number;
        email: string;
    } | null;
}

export function withAuthInfo<T>(Component: ComponentType<T & WithAuthInfoProps>): ComponentType<T> {
  return function WithAuthInfo(props: T) {
    const authorizationStatus = useAppSelector(getAuthorizationStatus);
    const userData = useAppSelector(getUserData);

    return (
      <Component
        {...props}
        authorizationStatus={authorizationStatus}
        userData={userData}
      />
    );
  };
}
