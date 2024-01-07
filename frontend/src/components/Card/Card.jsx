import ButtonLike from "../ButtonLike/ButtonLike.jsx"
import { useContext } from "react"
import CurrentUserContext from "../../CurrentUserContext/CurrentUserContext.js"

export default function Card({ card, onCardClick, onDelete }){
  const currentUser = useContext(CurrentUserContext)
  return(
    <article className="element">
      <img 
        className="element__image" 
        src={card.link}  
        alt={card.name} 
        onClick={() => onCardClick(card)}
      />
      {currentUser._id === card.owner._id && <button type="button" className="element__delete" onClick={() => onDelete(card._id)}/>}
      <div className="element__obertka">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__obertka_like">
          <ButtonLike likes={card.likes} myId={currentUser._id} cardId={card._id}/>
        </div>
      </div>
    </article>      
  )
}