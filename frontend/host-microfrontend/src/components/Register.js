import React from 'react';

const RemoteRegister = React.lazy(
  () => import('auth/Register'),
);

function Register (props){
  return (
      <React.Suspense fallback="Loading register">
        <RemoteRegister {...props} />
      </React.Suspense>
  )
}

export default Register;
