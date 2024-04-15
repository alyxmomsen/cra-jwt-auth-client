import { Link } from "react-router-dom";

import style from "./style/style.module.css";

export default function LogOutButton() {
  return (
    <div className={style.wrapper}>
      <span>LogOut</span>
    </div>
  );
}
