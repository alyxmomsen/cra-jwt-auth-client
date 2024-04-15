import { Link, Navigate, redirect, Route } from "react-router-dom";
import NavBar from "../../navigation/Nav-bar";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import Header from "../../header/Header";

import mainStyle from "../main_style.module.css";
import { mainContext } from "../../../App";
import { stat } from "fs";
import { reducer_1 } from "./reducers/reducers";
import {
  getAccountData,
  updateUserData,
  action_UploadImage,
} from "./actions/actions";
import { UserData } from "./types/types";
// import { updateUserData } from "./api/api";

export default function Account() {
  const globalContext = useContext(mainContext);
  const [state, dispatch] = useReducer<
    (
      state: UserData | null,
      action: { type: string; payload: Partial<UserData> | null },
    ) => UserData | null
  >(reducer_1, null);

  useEffect(() => {
    getAccountData(dispatch);
  }, []);

  const [isRegistrated, setIsRegistration] = useState(
    globalContext.isAuthorized,
  );
  return (
    <>
      {isRegistrated ? (
        <div className={mainStyle.wrapper}>
          <Header parentContainer="account" />
          <h1>{state?.userName}</h1>
          <UserComponent
            user={{
              name: `${state?.userName}`,
              password: `${state?.userPassword}`,
            }}
            state={state}
            userDispatch={dispatch}
          />
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}

function UserComponent({
  user,
  state,
  userDispatch,
}: {
  user: {
    name: string;
    password: string;
  };
  state: UserData | null;
  userDispatch: React.Dispatch<{
    type: string;
    payload: Partial<UserData> | null;
  }>;
}) {
  const src =
    "https://i.pinimg.com/564x/a5/fb/58/a5fb58e5ac827784a1aa1b448960f6db.jpg";

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState({ started: false, pc: Infinity });
  const [msg, setMsg] = useState("");

  return (
    <div>
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];

              setFile(file);
            }
          }}
          type="file"
          name="client-file"
        />
        <button
          onClick={() => {
            action_UploadImage(file, setMsg, setProgress);
          }}
          type="button"
        >
          upload
        </button>
      </form>
      <img width={200} height={200} src={src} alt="BigCo Inc. logo" />
      {progress.started && <progress max={100} value={progress.pc} />}
      <form>
        <p>
          <label htmlFor="input-name">Name:</label>
          <input
            onInput={(e) => {
              userDispatch({
                type: "update",
                payload: { newUserName: e.currentTarget.value },
              });
            }}
            id="input-name"
            type="text"
            value={state?.newUserName}
          />
        </p>
        <p>
          <label htmlFor="input-password">Password:</label>
          <input
            onInput={(e) => {
              userDispatch({
                type: "update",
                payload: { newUserPassword: e.currentTarget.value },
              });
            }}
            id="input-password"
            type="text"
            value={state?.newUserPassword}
          />
        </p>
      </form>
      <button
        onClick={() => {
          userDispatch({
            type: "update",
            payload: {
              newUserName: "",
              newUserPassword: "",
            },
          });
        }}
      >
        clear the form
      </button>
      <button onClick={() => updateUserData(state, userDispatch)}>
        update user data
      </button>
      <div>
        <h2>hook</h2>
        <div>
          <button onClick={() => {
            const base_url = "http://localhost:3000/hook"; ;
            const config = {
              
            }
            axios.post(base_url , {
              foo:'bar' ,
            } , {
              headers: {
                Authorization:'auth string' ,
                'x-auth-0':'auth'
              }
            }).then(response => {

              console.log(response);

            });


          }}>click me</button>
        </div>
      </div>
    </div>
    
  );
}
