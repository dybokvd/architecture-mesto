import React from 'react';

const Places = React.lazy(
  () => import('places/Main'),
);

const Main = ({ onEditAvatar, onEditProfile, ...props }) => {
  const { currentUser } = props;
  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={() => {}}></button>
      </section>
      <React.Suspense fallback="Loading places">
        <Places {...props}/>
      </React.Suspense>
    </main>
  );
}

export default Main;
