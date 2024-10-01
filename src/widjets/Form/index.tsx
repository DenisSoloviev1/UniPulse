import React from "react";
import style from "./style.module.scss";
import Calendar from "../Calendar";

const Form: React.FC = () => {
  return (
    <form action="">
      <label htmlFor="text">Текст уведомления</label>
      <textarea id="text" placeholder="О чем вы хотите сообщить?"></textarea>

      <label htmlFor="groupMedia">Прикрепленные медиа</label>
      <div className={style.groupMedia} id="groupMedia"></div>

      <label htmlFor="groupFollowers">Получатели</label>
      <div className={style.groupFollowers} id="groupFollowers"></div>

      <Calendar/>

      <button type="submit">Отправить сейчас</button>
    </form>
  );
};
export default Form;
