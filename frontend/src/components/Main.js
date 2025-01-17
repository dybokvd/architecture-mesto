import React from 'react';

const Places = React.lazy(
  () => import('places/Main'),
);

const Profile = React.lazy(
  () => import('profile/Main'),
);

const Main = ({ currentUser }) => {
  return (
    <main className="content">
      <React.Suspense fallback="Loading profile">
        <Profile currentUser={currentUser} />
      </React.Suspense>
      <React.Suspense fallback="Loading places">
        <Places currentUser={currentUser} />
      </React.Suspense>
    </main>
  );
}

export default Main;
