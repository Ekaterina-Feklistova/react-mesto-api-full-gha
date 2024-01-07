import './Login.css';
import { useState } from 'react';

export default function Login(props){
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
    props.onLogin({ email, password })
  }

  return(
    <div className="login__container">
      <h3 className="login__title">Вход</h3>
      <form className="login__form" onSubmit={handleSubmit}>
        <input 
          className="login__input"
          name = 'email'
          type = 'email'
          placeholder = "Введите ваш email"
          value = {email}
          onChange = {handleChangeEmail}
          required
        />
        <input
          className="login__input"
          name = 'password'
          type = 'password'
          placeholder = "Введите ваш пароль"
          minLength = {3}
          value = {password}
          onChange = {handleChangePassword}
          required
        />
        <button className="login__button">Войти</button>
      </form>
    </div>
  )
}