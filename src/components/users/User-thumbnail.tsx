import { useState } from "react";

import style from "./style-thumb.module.css";

export default function UserThumbnail({ name }: { name: string | undefined }) {
  const [state, setState] = useState();

  return (
    <div className={style.wrapper}>
      <div>
        <img
          width={100}
          height={100}
          src="https://i.pinimg.com/564x/a5/fb/58/a5fb58e5ac827784a1aa1b448960f6db.jpg"
        />
        <div>
          <h4>{name}</h4>
          <p>Description</p>
        </div>
      </div>
    </div>
  );
}
