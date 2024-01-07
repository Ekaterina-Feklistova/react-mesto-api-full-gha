class Api {
    constructor(options){
        this._url = options.baseUrl;
    };

    _checkResponse(res){
        return res.ok ? res.json() : Promise.reject
    }

    _request(url, options) {
        return fetch(`${this._url}${url}`, options)
          .then(this._checkResponse)
    }
     
    getUserInfo(token) {
        return this._request('/users/me', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    getCards(token) {
        return this._checkResponse('/cards', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    setUserInfo(data, token) {
        return this._checkResponse('/users/me', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.subname
            })
        })
    }

    setNewAvatar(data, token) {
        return this._checkResponse('/users/me/avatar', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
    }

    addCard(data, token) {
        return this._checkResponse('/cards', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
    }

    addLike(cardId, token){
        return this._checkResponse(`/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    deleteLike(cardId, token){
        return this._checkResponse(`/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    deleteCard(cardId, token){
        return this._checkResponse(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
}
const api = new Api({
    baseUrl: 'https://localhosts:3000',
})

export default api