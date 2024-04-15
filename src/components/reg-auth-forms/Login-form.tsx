import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

import style from "./style/style.module.css";
import { mainContext } from "../../App";
import { onLogout } from "./Registration";

interface UserData {
  email: string;
  password: string;
}

function reducer(
  state: UserData,
  action: { type: string; payload: Partial<UserData> },
) {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

async function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  data: Partial<UserData>,
  dispatch: React.Dispatch<{
    type: string;
    payload: Partial<UserData>;
  }>,
  globalContext: {
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<
      React.SetStateAction<{
        isAuthorized: boolean;
      }>
    > | null;
  },
) {
  event.preventDefault();

  console.log(data);

  await axios
    .post("http://localhost:3000/login", { ...data })
    .catch((err) => {
      console.log("error", err);
    })
    .then((response) => {
      if (response) {
        if (response.data?.auth === true) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userid", response.data.userid);

          console.log(localStorage);

          globalContext.setIsAuthorized?.({ isAuthorized: true });
        }
      }
      dispatch({ type: "update", payload: { email: "", password: "" } });
      console.log(response);
    });
}

export default function LoginForm({
  switchState,
  switchDispatch,
}: {
  switchState: boolean;
  switchDispatch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, dispatch] = useReducer<
    (
      state: UserData,
      action: { type: string; payload: Partial<UserData> },
    ) => UserData
  >(reducer, {
    email: "",
    password: "",
  });

  const globalContext = useContext(mainContext);

  useEffect(() => {}, []);

  return (
    <div className={style.wrapper}>
      <span
        onClick={() => {
          switchDispatch(!switchState);
        }}
      >
        Registration
      </span>
      {globalContext.isAuthorized && (
        <span>
          <span> / </span>
          <span
            onClick={() => {
              onLogout(globalContext);
            }}
          >
            LogOut
          </span>
        </span>
      )}
      <h1>LogIn</h1>
      <form onSubmit={(e) => onSubmit(e, state, dispatch, globalContext)}>
        <input
          placeholder="e-mail"
          onInput={(e) => {
            dispatch({
              type: "update",
              payload: { email: e.currentTarget.value },
            });
          }}
          value={state.email}
          type="email"
        />
        <input
          placeholder="password"
          onInput={(e) => {
            dispatch({
              type: "update",
              payload: { password: e.currentTarget.value },
            });
          }}
          value={state.password}
          type="password"
        />
        <input value={"submit"} type="submit" />
      </form>
    </div>
  );
}
