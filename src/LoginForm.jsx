import { useState } from "react";
import { RandomPet } from "./PetDisplay";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (username) {
      onLogin(username);
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <form className="login__form" action="#/login" onSubmit={onSubmit}>
          <label>
            <span>Username:</span>
            <input
              className="login__username"
              value={username}
              onChange={onChange}
            />
          </label>
          <button className="login__button" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="login__pet">
        <RandomPet/>
      </div>
    </div>
  );
}

export default LoginForm;
