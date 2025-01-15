import React from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import '../blocks/places/places.css';

function Main({ onEditProfile, onEditAvatar, currentUser }) {
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);

    // Запрос к API за информацией о массиве карточек выполняется единожды, при монтировании.
    React.useEffect(() => {
        api
        .getCardList()
        .then((cardData) => {
            setCards(cardData);
        })
        .catch((err) => console.log(err));
    }, []);

    function handleCardDelete(card) {
        api
          .removeCard(card._id)
          .then(() => {
            setCards((cards) => cards.filter((c) => c._id !== card._id));
          })
          .catch((err) => console.log(err));
      }
      
    // const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeImagePopup() {
        setSelectedCard(null);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
          .changeLikeCardStatus(card._id, !isLiked)
          .then((newCard) => {
            setCards((cards) =>
              cards.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCard) {
        api
          .addCard(newCard)
          .then((newCardFull) => {
            setCards([newCardFull, ...cards]);
            setIsAddPlacePopupOpen(false);
          })
          .catch((err) => console.log(err));
      }

    // function handleAddPlaceClick() {
    //     setIsAddPlacePopupOpen(true);
    // }

    function handleAddPlacePopupClose() {
        setIsAddPlacePopupOpen(false);
    }

    return (
        <main className="content">
            <ImagePopup card={selectedCard} onClose={closeImagePopup} />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onAddPlace={handleAddPlaceSubmit}
                onClose={handleAddPlacePopupClose}
            />
            {/* <section className="profile page__section">
                <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
            </section> */}
            <section className="places page__section">
                <ul className="places__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            currentUser={currentUser}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
