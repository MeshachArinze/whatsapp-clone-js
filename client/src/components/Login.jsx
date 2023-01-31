import React, { useRef } from "react";
import { v4 as uuidV4 } from "uuid";

export default function Login({ onIdSubmit }) {
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onIdSubmit(idRef.current.value);
  }

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <div
      className="item-center flex"
      style={{ height: "100vh" }}
    >
      <form onSubmit={handleSubmit} className="w-100">
        <div>
          <label>Enter Your Id</label>
          <input type="text" ref={idRef} required />
        </div>
        <button type="submit" className="mr-2">
          Login
        </button>
        <button onClick={createNewId} variant="secondary">
          Create A New Id
        </button>
      </form>
    </div>
  );
}
