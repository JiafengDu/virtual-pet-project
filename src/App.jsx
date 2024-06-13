import { useEffect, useReducer } from "react";

import "./App.css";
import reducer, { initialState } from "./reducer";
import { LOGIN_STATUS, CLIENT, SERVER, ACTIONS, PAGES } from "./constants";
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchPets,
  fetchUpdatePet,
  fetchDeletePet,
  fetchAddPet,
  fetchRandomPetParts,
  fetchChats,
} from "./services";

import LoginForm from "./LoginForm";
import Loading from "./Loading";
import Controls from "./Controls";
import Status from "./Status";
import { ShowPets } from "./PetDisplay";
import { ChatRoom } from "./ChatRoom";
import Discover from "./Discover";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onEvents = {};
  onEvents.onLogin = function onLogin(username) {
    dispatch({ type: ACTIONS.START_LOADING });
    fetchLogin(username)
      .then((pets) => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.REPLACE_PETS, pets });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  onEvents.onLogout = function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout() 
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  onEvents.onRefresh = function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING });
    fetchPets()
      .then((pets) => {
        dispatch({ type: ACTIONS.REPLACE_PETS, pets });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  onEvents.onDeletePet = function onDeletePet(id) {
    dispatch({ type: ACTIONS.START_LOADING });
    fetchDeletePet(id)
      .then(() => {
        return fetchPets(); 
      })
      .then((pets) => {
        dispatch({ type: ACTIONS.REPLACE_PETS, pets });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  onEvents.onTogglePet = function onTogglePet(id) {
    fetchUpdatePet(id, { done: !state.pets[id].done })
      .then((pet) => {
        dispatch({ type: ACTIONS.TOGGLE_PET, pet });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  onEvents.onAddPet = function onAddPet(pet) {
    fetchAddPet(pet)
      .then((pet) => {
        dispatch({ type: ACTIONS.ADD_PET, pet });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  onEvents.onHome = function onHome() {
    dispatch({ type: ACTIONS.CHANGE_PAGE, page: PAGES.HOME });
  };

  onEvents.onChatRoom = function onChatRoom() {
    dispatch({ type: ACTIONS.CHANGE_PAGE, page: PAGES.CHATROOM });
  };

  onEvents.onDiscover = function onDiscover() {
    dispatch({ type: ACTIONS.CHANGE_PAGE, page: PAGES.DISCOVER });
  };

  function checkForSession() {
    fetchSession()
      .then((session) => {
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        return fetchPets(); 
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION }); 
        }
        return Promise.reject(err); 
      })
      .then((pets) => {
        dispatch({ type: ACTIONS.REPLACE_PETS, pets });
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  useEffect(
    () => {
      checkForSession();
    },
    [] 
  );

  return (
    <div className="app">
      <main className="main">
        {state.error && <Status error={state.error} />}
        {state.loginStatus === LOGIN_STATUS.PENDING && (
          <Loading className="login__waiting">Loading user...</Loading>
        )}
        {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <LoginForm onLogin={onEvents.onLogin} />
        )}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN &&
          state.page === PAGES.HOME && (
            <div className="content">
              <p>Hello, {state.username}</p>
              <ShowPets
                isPending={state.isPending}
                pets={state.pets}
                lastAddedPetId={state.lastAddedPetId}
                onDeletePet={onEvents.onDeletePet}
                onTogglePet={onEvents.onTogglePet}
              />
              <Controls onEvents={onEvents} />
            </div>
          )}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN &&
          state.page === PAGES.CHATROOM && (
            <div className="content">
              <div className="user__info">
                <p>Hello, {state.username}</p>
              </div>
              <Controls onEvents={onEvents} />
              <ChatRoom username={state.username} />
            </div>
          )}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN &&
          state.page === PAGES.DISCOVER && (
            <div className="content">
              <p>Hello, {state.username}</p>
              <Controls onEvents={onEvents} />
              <Discover username={state.username} onEvents={onEvents} />
            </div>
          )}
      </main>
    </div>
  );
}

export default App;
