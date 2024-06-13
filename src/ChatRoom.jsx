import React, { useState, useReducer, useRef } from "react";
import {
  fetchChats,
  fetchDeleteChat,
  fetchPostChat,
} from "./services";
import { ACTIONS } from "./constants";
import reducer, { initialState } from "./reducer";
import { useEffect } from "react";

export function ChatRoom({ username }) {
  const [STATE, dispatch] = useReducer(reducer, initialState);
  const [state, setState] = useState({
    chats: {},
    isPending: false,
    editingChat: "",
    username: username,
  });

  const inputRef = useRef(null); 

  function onAddChat(e) {
    e.preventDefault();

    const chatInput = inputRef.current.value; 

    fetchPostChat(chatInput)
      .then((response) => {
        setState({
          ...state,
          chats: {
            ...state.chats,
            [response.chatId]: response.chatData,
          },
        });
        inputRef.current.value = ""; 
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onDeleteChat(chatId) {
    setState((prevState) => ({ ...prevState, isPending: true }));
    fetchDeleteChat(chatId)
      .then(() => fetchChats())
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          chats: response.chatHistory,
          isPending: false,
        }));
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }


  function ChatControl(state, chatId) {
    if (
      state.username !== state.chats[chatId].username ||
      state.chats[chatId].isDeleted
    ) {
      return null; 
    }

    return (
      <div className="chat__controls">
        <button
          data-id={chatId}
          className="delete__chat__button"
          onClick={() => onDeleteChat(chatId)}>
          Delete
        </button>
      </div>
    );
  }

  function Chats() {
    const chatsHtml = Object.keys(state.chats).map((chatId) => {
      if (state.chats[chatId].isDeleted) {
        return (
          <li key={chatId} data-chatid={chatId}>
            This chat has been deleted by {state.chats[chatId].username}
          </li>
        );
      }
      return (
        <li key={chatId} data-chatid={chatId}>
          <div className="controls__container">
            <div className="chat__message">{state.chats[chatId].chatInput}</div>
          </div>
          <div className="chat__owner">
            <span>From: </span>
            {state.chats[chatId].username}
          </div>
          {ChatControl(state, chatId)}
        </li>
      );
    });

    return (
      <div className="chats">
        <ul className="chat__list">{chatsHtml}</ul>
      </div>
    );
  }

  function AddChatButton() {
    return (
      <form className="add__chat__form" onSubmit={onAddChat}>
        <input
          ref={inputRef}
          className="add__chat"
          placeholder="Enter chat message"
        />
        <button type="submit" className="add__chat__button">
          Add
        </button>
      </form>
    );
  }

  useEffect(() => {
    fetchChats().then((response) => {
      setState({
        ...state,
        chats: response.chatHistory,
      });
    });
  }, []);

  return (
    <div className="chat__room__content">
      <Chats />
      <AddChatButton />
    </div>
  );
}
