import React from 'react';

const RemoteLogin = React.lazy(
  () => import('auth/Login'),
);

function Login (props){
  return (
      <React.Suspense fallback="Loading login">
        <RemoteLogin {...props} />
      </React.Suspense>
  )
}

export default Login;
