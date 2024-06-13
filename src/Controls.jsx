import "./Controls.css";

function Controls({ onEvents }) {
  return (
    <div className="controls">
      <div className="controls__container">
        <button onClick={onEvents.onRefresh} className="controls__button controls__refresh">Refresh</button>
        <button onClick={onEvents.onHome} className="controls__button controls__home">Home</button>
        <button onClick={onEvents.onChatRoom} className="controls__button controls__chat__room">Chat Room</button>
        <button onClick={onEvents.onDiscover} className="controls__button controls__discover">Discover</button>
      <button onClick={onEvents.onLogout} className="controls__button controls__logout">Logout</button>
      </div>
    </div>
  );
}

export default Controls;
