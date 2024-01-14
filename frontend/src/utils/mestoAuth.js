const BASE_URL = 'https://api.feklistova.nomoredomainsmonster.ru';
function getResponseData(res){
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
}

export function registration(data){ 
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => getResponseData(res))
}

export function authorization(data){
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => getResponseData(res))
}

export function getUserData(token){
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(res => getResponseData(res))
  }