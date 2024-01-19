import api from "../utils/api.js";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx"
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from '../CurrentUserContext/CurrentUserContext.js'
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import ProtectedHome from "./ProtectedHome/ProtectedHome.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx"
import { registration, authorization, getUserData } from "../utils/mestoAuth.js"
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";

function App() {
  const navigate = useNavigate()
  //popups
  const [isEditProfilePopup, setIsEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  //const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false)
  //const [isSend, setIsSend] = useState(false)

  //context
  const [currentUser, setCurrentUser] = useState({})
  const [userEmail, setUserEmail] = useState('')

  //card
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState('')
  
  //login, registration
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false)

  //const isOpen = isEditProfilePopup || isAddPlacePopupOpen || isDeletePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isResultPopupOpen
  
  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopup(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false)
    setSelectedCard(null)
    setIsResultPopupOpen(false)
  }, [])

  useEffect(() => {
    if (localStorage.jwt){
      getUserData(localStorage.jwt)
      .then(res => {
        setUserEmail(res.email)
        setLoggedIn(true)
        navigate('/')
      })
      .catch(err => console.log(`Ошибка авторизации при повторном входе ${err}`))
    } else {
      setLoggedIn(false)
    }
  }, [navigate])

  function handleEditProfileClick(){
    setIsEditProfilePopup(true)
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
  }
  
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  function handleDeletePopupClick(cardId){
    setDeleteCardId(cardId)
    setIsDeletePopupOpen(true)
  }

  //useEffect(() => {
    //if(loggedIn){
      //Promise.all([api.getUserInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
        //.then(([dataUser, dataCard]) => {
          //setCurrentUser(dataUser)
          //setCards(dataCard.reverse())
      //})
        //.catch((err) => console.log(`Ошибка при создании начальных данных ${err}`))
    //}
  //},[loggedIn])
  useEffect(() => {
    if (loggedIn){
      api.getUserInfo(localStorage.jwt)
        .then((dataUser) => {
          setCurrentUser(dataUser)
        })
        .catch((err) => console.log(`Ошибка данных пользователя ${err}`))
    }
  },[loggedIn])

  useEffect(() => {
    if (loggedIn){
      api.getCards(localStorage.jwt)
        .then((dataCard) => {
          setCards(dataCard.reverse())
        })
        .catch((err) => console.log(`Ошибка данных карточки ${err}`))
    }
  },[loggedIn])
  
  function handleRegister(data){
    registration(data)
      .then(res => {
        if(res && res.data){
          setIsSuccessful(true)
          setIsResultPopupOpen(true)
          navigate('/sign-in')
        }
      })
      .catch((err) => {
        setIsSuccessful(false)
        setIsResultPopupOpen(true)
        console.log(`Ошибка при регистрации ${err}`)
      })
  }
  function handleLogin(data){
    authorization(data)
      .then(res => {
        if (res && res.token){
          localStorage.setItem('jwt', res.token);
          navigate('/')
          setUserEmail(data.email);
          setLoggedIn(true)
        }
      })
      .catch((err) => {
        setIsSuccessful(false)
        setIsResultPopupOpen(true)
        console.log(`Ошибка при авторизации ${err}`)
      })
  }

  function handleDeleteSubmit(evt){
    evt.preventDefault()
    api.deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка при удалении карточки ${err}`))
  }

  function handleUpdateUser(dataUser, reset){
    api.setUserInfo(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((err) => console.log(`Ошибка при редактировании профиля ${err}`))
  }
  
  function handleUpdateAvatar(dataUser, reset){
    api.setNewAvatar(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((err) => console.log(`Ошибка при редактировании аватара ${err}`))
  }

  function handleAddPlace(dataCard, reset){
    api.addCard(dataCard, localStorage.jwt)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((err) => console.log(`Ошибка при добавлении карточки ${err}`))
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              element={ProtectedHome}
              userEmail={userEmail}
              onEditProfile = {handleEditProfileClick}
              onAddPlace = {handleAddPlaceClick}
              onEditAvatar = {handleEditAvatarClick}
              onCardClick = {handleCardClick}
              onDelete = {handleDeletePopupClick}
              cards = {cards}
              loggedIn={loggedIn}
            />}
          />
          <Route path="/sign-in" element={
            <>
              <Header name='signin' />
              <Login name='signin' onLogin={handleLogin} />
            </>
          }/>
          <Route path="/sign-up" element={
            <>
              <Header name='signup' />
              <Register name='signup' onRegister={handleRegister} />
            </>
          }/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>        
        <Footer />
        <EditProfilePopup 
          onUpdateUser = {handleUpdateUser}
          isOpen = {isEditProfilePopup}
          onClose = {closeAllPopups}
        />
        <AddPlacePopup
          isOpen = {isAddPlacePopupOpen}
          onAddPlace = {handleAddPlace}
          onClose = {closeAllPopups}
        />
        <EditAvatarPopup 
          onUpdateAvatar = {handleUpdateAvatar}
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
        />
        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          titleButton='Да'
          isOpen = {isDeletePopupOpen}
          onClose = {closeAllPopups}
          onSubmit = {handleDeleteSubmit}
        />      
        <ImagePopup
          name='image'
          card = {selectedCard}
          onClose = {closeAllPopups} 
        />
        <InfoTooltip
          name='result'
          isSuccessful={isSuccessful}
          isOpen={isResultPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
