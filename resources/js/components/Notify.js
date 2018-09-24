import React from "react";

const Notify = ({ type, message, clear }) => <div class={type}>{message} <button onClick={clear}>X Close</button></div>;

export default Notify;
