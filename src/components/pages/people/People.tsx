import { Link } from "react-router-dom";
import NavBar from "../../navigation/Nav-bar";
import Header from "../../header/Header";
import { useContext, useEffect, useState } from "react";
import mainStyle from "../main_style.module.css";
import { mainContext } from "../../../App";
import axios from "axios";
import UserThumbnail from "../../users/User-thumbnail";

export default function People() {
  const globalContext = useContext(mainContext);

  const [users, setUsers] = useState<
    Partial<{
      name: string;
      email: string;
      password: string;
      gender: string;
      access_token: string;
    }>[]
  >([]);

  useEffect(() => {
    axios
      .get<
        Partial<{
          name: string;
          email: string;
          password: string;
          gender: string;
          access_token: string;
        }>[]
      >("http://localhost:3000/people")
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
        }
      })
      .catch(() => {
        // alert();
      })
      .finally();
  }, []);

  return (
    <div className={mainStyle.wrapper}>
      <Header parentContainer="people" />
      <h1>People</h1>
      {users.map((user) => (
        <UserThumbnail name={user.name} />
      ))}
    </div>
  );
}
