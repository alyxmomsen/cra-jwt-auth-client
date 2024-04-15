import axios from "axios";
import { UserData } from "../types/types";

export async function action_UploadImage(
  file: File | null,
  setMsg: React.Dispatch<React.SetStateAction<string>>,
  setProgress: React.Dispatch<
    React.SetStateAction<{
      started: boolean;
      pc: number;
    }>
  >,
  /*   token:string ,
  uid:string , */
) {
  if (file) {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("userid");

    if (!token || !uid) {
      alert("no token of uid");
      return;
    }

    const base_url = "http://localhost:3000/upload";
    const test_api = "http://httpbin.org/post";
    const api = [base_url, test_api];
    const formData = new FormData();
    formData.append("image", file);

    /* formData.append('name' , 'max stierlitz'); */
    setMsg("uplodading...");
    setProgress((prevState) => ({ ...prevState, started: true }));
    axios
      .post(api[0], formData, {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.progress;
          if (progress) {
            setProgress((prevstate) => ({
              ...prevstate,
              pc: progress * 100,
            }));
          }
        },
        headers: {
          "x-user-id": uid, // user id
          Authorization: `Bearer ${token}`, // Добавляем заголовок с JWT токеном
        },
      })
      .then((response) => {
        setMsg("upload successful");
        console.log(response.data);
      })
      .catch((err) => {
        setMsg("upload failed");
        console.error(err);
      });
  } else {
    alert("no image");
  }
}

export async function updateUserData(
  state: UserData | null,
  dispatch: React.Dispatch<{
    type: string;
    payload: Partial<UserData> | null;
  }>,
) {
  const base_url = "http://localhost:3000";
  const token = localStorage.token;
  const userid = localStorage.userid;

  if (!token) return;
  if (!userid) return;

  axios
    .put(`${base_url}/update`, {
      token,
      userid,
      payload: {
        name: state?.newUserName,
        password: state?.newUserPassword,
      },
    })
    .then((response) => {
      const { name, password } = response.data.message;

      dispatch({
        type: "update",
        payload: {
          userName: name,
          newUserName: name,
          userPassword: password,
          newUserPassword: password,
        },
      });

      console.log(response);
    })
    .catch((err) => {});
}

export async function isAuthorized() {
  const token = localStorage.token;
  const userid = localStorage.userid;

  const base_url = "http://localhost:3000";

  const resutl = await axios
    .post("http://localhost:3000/auth", { token: token, userid: userid })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // alert(error);
      console.log("u have some errors: ", error);
    })
    .finally(() => {});

  return resutl;
}

export async function getAccountData(
  dispatch: React.Dispatch<{
    type: string;
    payload: Partial<UserData> | null;
  }>,
) {
  const base_url = "http://localhost:3000";
  const token = localStorage.token;
  const userid = localStorage.userid;

  if (!token && !userid) return;

  await axios
    .post(base_url + "/account", {
      token,
      userid,
    })
    .then((response) => {
      const { name, password } = response.data.payload;

      dispatch({
        type: "update",
        payload: {
          userName: name,
          userPassword: password,
        },
      });
    })
    .catch((err) => {
      alert();
      console.log(err);
    });
}
