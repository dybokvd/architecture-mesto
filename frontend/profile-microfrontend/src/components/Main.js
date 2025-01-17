import React from 'react';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from '../utils/api';
import '../blocks/profile/profile.css';

function Main({ currentUser }) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);

    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }
    
    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
              setCurrentUser(newUserData);
              closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceButtonClick() {
        // TODO: вызывать здесь соответствующее событие в шине событий
    }

    function handleEditAvatarPopupClose() {
        setIsEditAvatarPopupOpen(false);
    }

    function handleEditProfilePopupClose() {
        setIsEditProfilePopupOpen(false);
    }

    return (
        <section className="profile page__section">
            <EditProfilePopup
                currentUser={currentUser}
                isOpen={isEditProfilePopupOpen}
                onUpdateUser={handleUpdateUser}
                onClose={handleEditProfilePopupClose}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={handleUpdateAvatar}
                onClose={handleEditAvatarPopupClose}
            />
            <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={handleAddPlaceButtonClick}></button>
        </section>
    );
}

export default Main;
