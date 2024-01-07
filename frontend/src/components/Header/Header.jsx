import logo from "../../images/logo.svg"
import { Link } from "react-router-dom";
import './Header.css'

export default function Header({ name, dataUser }){
  function onSignOut(){
    localStorage.removeItem('jwt')
  }
  return(
    <header className="header">
      <img
        src={logo}
        alt="логотип."
        className="header__logo"
      />
      {name === 'signup' || name === 'signin' ?
        <Link to={name === 'signup' ? '/sign-in' : '/sign-up'} className="header__link">
          {name === 'signup' ? 'Войти' : 'Регистрация'}
        </Link>
        :
        <>
          <div className="header__email-container">
            <p className="header__email">{dataUser}</p>
            <Link to={'sign-in'} className="header__unlogin" onClick={onSignOut}>Выйти</Link>
          </div>
        </>
      }      
    </header>
  )
}
