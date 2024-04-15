import axios from "axios";
import Registration from "../../reg-auth-forms/Registration";
import LoginForm from "../../reg-auth-forms/Login-form";
import Header from "../../header/Header";
import mainStyle from "../main_style.module.css";
import { useContext, useEffect, useState } from "react";
import { mainContext } from "../../../App";

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const response = await axios.post("http://127.0.0.1:3000/register", {
    name: "Alexy",
    email: "email",
    password: "pass",
    gender: "male",
  });

  const data = response.data;
  console.log(data);
  return data;
}

export default function Home() {
  const [regAuthSwitch, setSwitchToRegistration] = useState(true);

  useEffect(() => {});

  return (
    <div className={mainStyle.wrapper}>
      <Header parentContainer="home" />
      <h1>This.Is.The.Home</h1>
      <h2>Description</h2>
      <div>
        {regAuthSwitch ? (
          <Registration
            switchState={regAuthSwitch}
            switchDispatch={setSwitchToRegistration}
          />
        ) : (
          <LoginForm
            switchState={regAuthSwitch}
            switchDispatch={setSwitchToRegistration}
          />
        )}
      </div>
    </div>
  );
}

function incrementHandler(
  state: [number, React.Dispatch<React.SetStateAction<number>>],
) {
  const [curState, setCurState] = state;
  setCurState(state[0] === Infinity ? 0 : state[0] + 1);
}

function decrementHandler(
  state: [number, React.Dispatch<React.SetStateAction<number>>],
) {
  const [curState, setCurState] = state;
  setCurState(state[0] === Infinity ? 0 : state[0] - 1);
}
