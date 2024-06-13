  export function fetchAddPet(pet) {
    return fetch('/api/v1/pets', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( { pet } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
  export function fetchDeletePet(id) {
    return fetch(`/api/v1/pets/${id}`, {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
  export function fetchUpdatePet( id, todoUpdates ) {
    return fetch(`/api/v1/pets/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( todoUpdates ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
  export function fetchPets() {
    return fetch('/api/v1/pets')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
  export function fetchSession() {
    return fetch('/api/v1/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
  export function fetchLogout() {
    return fetch('/api/v1/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  
  export function fetchLogin(username) {
    return fetch('/api/v1/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  export function fetchRandomPetParts(n) {
    return fetch(`/api/v1/random-pet-parts?count=${n}`)
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json()
          .catch(error => Promise.reject({ error }))
          .then(err => Promise.reject(err));
      });
  }

  export function fetchChats(){
    return fetch('/api/v1/chats')
    .catch( () => Promise.reject({ error: 'networkError' }))
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }))
        .then( err => Promise.reject(err) );
    });
}

export function fetchPostChat(chat){
  return fetch('/api/v1/chats', {
      method: 'POST',
      headers: new Headers({
          'content-type': 'application/json'
      }),
      body: JSON.stringify({ chat }),
  })
  .catch( ()=> Promise.reject({ error: 'networkError' }) )
  .then( response => {
      if (response.ok) {
          return response.json();
      }
      return response.json()
      .catch( error =>Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
  });
}

export function fetchDeleteChat(chatId) {
  return fetch(`/api/v1/chats/${chatId}`,{
      method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'networkError' }))
  .then( response => {
      if (response.ok) {
          return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }))
      .then( err => Promise.reject(err));
  });
}