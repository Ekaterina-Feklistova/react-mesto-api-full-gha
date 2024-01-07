import { useState } from "react"
import { Link } from "react-router-dom";
import '../Login/Login.css'

export default function Register(props){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleChangeEmail(evt){
    setEmail(evt.target.value)
  }

  function handleChangePassword(evt){
    setPassword(evt.target.value)
  }

  function handleSubmit(evt){
    evt.preventDefault();
    props.onRegister({ email, password })
  }

  return(
    <div className="login__container">
      <h3 className="login__title">Регистрация</h3>
      <form className="login__form" onSubmit={handleSubmit}>
        <input 
          className="login__input"
          name = 'email'
          type = 'email'
          placeholder = "Введите email"
          value = {email}
          onChange = {handleChangeEmail}
          required
        />
        <input
          className="login__input"
          name = 'password'
          type = 'password'
          placeholder = "Введите пароль"
          minLength = {3}
          value = {password}
          onChange = {handleChangePassword}
          required
        />
        <button className="login__button">Зарегистрироваться</button>
      </form>
      <p className="login__subtitle">
        Уже зарегистрированы? <Link to="/sign-in" className="login__subtitle-link">Войти</Link>
      </p>
    </div>
  )
}