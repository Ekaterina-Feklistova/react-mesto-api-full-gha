import React, { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../CurrentUserContext/CurrentUserContext.js";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import '../../blocks/profile/profile.css';
//import '../../blocks/profile/__button/profile__button.css';

export default function Main({ name, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards, handleLogin, handleRegister }){
  const currentUser = useContext(CurrentUserContext)

  return(
    <main className="main">
      {name ==='main' ?
        <>
          <section className="profile">
            <button type="button" className="profile__button-avatar" onClick = {onEditAvatar}>
              <img src={currentUser.avatar} alt="аватар профиля." className="profile__avatar" />
            </button>
            <div className="profile__info">
              <div className="profile__obertka">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button type="button" className="profile__button-info" onClick = {onEditProfile}/>
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="profile__button"
              aria-label="Создать запись"
              onClick = {onAddPlace}
            />
          </section>
          <section className="elements">
            {cards.map(data => {
              return (            
                <Card card={data} key={data._id} onCardClick={onCardClick} onDelete={onDelete}/>
              )
            })}
          </section>
        </>
      :
      name === 'signup' ?
        <Register name={name} handleRegister={handleRegister}/>
        :
        <Login name={name} handleLogin={handleLogin}/>
      }
    </main>
  )
}