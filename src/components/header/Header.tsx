import { useContext } from "react";
import NavBar from "../navigation/Nav-bar";

import style from "./style.module.css";
import { mainContext } from "../../App";

export default function Header({
  parentContainer,
}: {
  parentContainer: string;
}) {
  const globalContext = useContext(mainContext);

  return (
    <div className={style.wrapper}>
      <div>
        auth: <span>{globalContext.isAuthorized ? "ON" : "OFF"}</span>
      </div>
      <NavBar current={parentContainer} />
    </div>
  );
}
