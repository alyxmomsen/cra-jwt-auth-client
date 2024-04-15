import { UserData } from "../types/types";

export function reducer_1(
  state: UserData | null,
  action: { type: string; payload: Partial<UserData> | null },
) {
  switch (action.type) {
    case "update":
      if (action.payload) {
        if (state) {
          return { ...state, ...action.payload };
        } else {
          return {
            ...{
              userName: "",
              userPassword: "",
              newUserName: "",
              newUserPassword: "",
            },
            ...action.payload,
          };
        }
      } else {
        if (state) {
          return { ...state };
        } else {
          return null;
        }
      }
    default:
      return state ? { ...state } : null;
  }
}
