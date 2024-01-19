import { useEffect, useState } from "react"
import api from "../../utils/api.js"

export default function ButtonLike({ likes = [], myId, cardId }){
    const [isLike, setIsLike] = useState(false)
    const [count, setCount] = useState(likes.length)

    useEffect(() => {
        setIsLike(likes.some(element => myId === element._id))
    },[likes, myId])

    function handleLike(){
        if(isLike){
            api.deleteLike(cardId, localStorage.jwt)
              .then(res => {
                setIsLike(false)
                setCount(res.likes.length)
              })
              .catch((err) => console.log(`Ошибка при снятии лайка ${err}`))
        } else {
            api.addLike(cardId, localStorage.jwt)
              .then(res => {
                setIsLike(true)
                setCount(res.likes.length)
              })
              .catch((err) => console.log(`Ошибка при установке лайка ${err}`))
        }
    }

    return(
        <>
          <button type="button" className={`element__like ${isLike ? 'element__like_active' : ''}`} onClick={handleLike}/>
          <span className="element__counter">{count}</span>
        </>
    )
}