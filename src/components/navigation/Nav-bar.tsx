import { Link } from "react-router-dom";
import style from "./style.module.css";
import { useContext } from "react";
import { mainContext } from "../../App";

export default function NavBar({ current }: { current: string }) {
  const links = [
    { page: "home", component: <Link to="/">Home</Link> },
    { page: "account", component: <Link to="/account">Account</Link> },
    { page: "people", component: <Link to="/people">People</Link> },
    // Добавьте остальные ссылки и их компоненты здесь
  ];

  const globalContext = useContext(mainContext);

  return (
    <div className={style.wrapper}>
      {links
        .filter((elem) =>
          elem.page === current ||
          (elem.page === "account" && globalContext.isAuthorized === false)
            ? false
            : true,
        )
        .map((elem) => elem.component)}
    </div>
  );
}
