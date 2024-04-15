import axios from "axios";
import { stat } from "fs";
import { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

import style from "./style/style.module.css";
import { GlobalContext, mainContext } from "../../App";

interface UserData {
  name: string;
  password: string;
  gender: string;
  email: string;
}

type Action = {
  type: string;
  payload: Partial<UserData>;
};

const reducer = (state: UserData, action: Action): UserData => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

async function onRegistrationSubmit(
  e: React.FormEvent<HTMLFormElement>,
  data: UserData,
  isRegisteredTuple:[boolean, React.Dispatch<React.SetStateAction<boolean>>] ,
  dispatch: React.Dispatch<{
    type: string;
    payload: Partial<UserData>;
  }>,
) {
  e.preventDefault();

  await axios
    .post("http://localhost:3000/registration" , { ...data } , {
      onUploadProgress:(e) => {
        console.log(e.progress);    
      }
    })
    .then((response) => {
      if(response.data.status) {
        isRegisteredTuple[1](true) ;
      }
    })
    .catch((err) => {
      isRegisteredTuple[1](false);
      console.error("!!! its ERROR !!! ", err);
    })
    .finally(() => {
      dispatch({
        type: "update",
        payload: { email: "", name: "", password: "" },
      });
    });
  return;
}

export default function Registration({
  switchState,
  switchDispatch,
}: {
  switchState: boolean;
  switchDispatch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isRegistrated , setIsRegistrated] = useState(false);
  const [state, dispatch] = useReducer<
    (state: UserData, action: Action) => UserData
  >(reducer, {
    name: "",
    password: "",
    gender: "female",
    email: "",
  });

  const globalContext = useContext(mainContext);

  return (
    <div className={style.wrapper}>
      {globalContext.isAuthorized ? (
        <span
          onClick={() => {
            onLogout(globalContext);
          }}
        >
          LogOUT
        </span>
      ) : (
        <span
          className="switch"
          onClick={() => {
            switchDispatch(!switchState);
          }}
        >
          LogIn
        </span>
      )}

      <h1>Registration</h1>
      <div>{isRegistrated ? 'registrated' : 'no reg'}</div>
      <form onSubmit={(e) => onRegistrationSubmit(e, state, [isRegistrated , setIsRegistrated] , dispatch)}>
        <input
          required
          value={state.name}
          onInput={(e) => {
            dispatch({
              type: "update",
              payload: { name: e.currentTarget.value },
            });
          }}
          placeholder="имя"
          type="text"
        ></input>
        <input
          required
          value={state.password}
          onInput={(e) => {
            dispatch({
              type: "update",
              payload: { password: e.currentTarget.value },
            });
          }}
          placeholder="пароль"
          type="password"
        ></input>
        {/* <input
          value={state.birthday}
          onInput={(e) => {
            dispatch({
              type: "update",
              payload: { birthday: e.currentTarget.value },
            });
          }}
          placeholder="дата рождения"
          type="date"
        ></input> */}
        <select
          required
          value={state.gender}
          onChange={(e) => {
            dispatch({
              type: "update",
              payload: { gender: e.currentTarget.value },
            });
          }}
          name="choice"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          value={state.email}
          onInput={(e) => {
            dispatch({
              type: "update",
              payload: { email: e.currentTarget.value },
            });
          }}
          placeholder="почта"
          type="email"
        ></input>
        <input
          onInput={() => {}}
          placeholder="photo"
          type="file"
        ></input>
        <input type="submit" value={"submit it"} />
      </form>
    </div>
  );
}

export async function onLogout(globalContext: GlobalContext) {
  axios
    .get("http://localhost:3000/logout", {})
    .then((response) => {
      if (response?.data?.auth === false) {
        localStorage.clear();
        globalContext.setIsAuthorized?.({ isAuthorized: false });
      } 
    })
    .catch((err) => {
      alert('logout false');
    });
}
