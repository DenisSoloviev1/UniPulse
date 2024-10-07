import React from "react";
import { useNavigate } from "react-router-dom"; // Импорт useNavigate
import style from "./style.module.scss";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import Flex from "../../components/Flex";
import CustomButton from "../../components/CustomButton";
import { WalcomingSvg, LogoDSTU } from "../../assets/svg";

const Auth: React.FC = () => {
  const navigate = useNavigate(); // Использование useNavigate

  const handleButtonClick = () => {
    navigate("/addPulse"); // Перейти на /addPulse при нажатии кнопки
  };

  return (
    <>
      <div className={style.wrapper}>
        <section className={style.walcoming}>
          <Flex className={"row"}>
            <WalcomingSvg />

            <div className={style.message}>
              <h1>Приветствуем вас в UniPulse!</h1>
              <p>
                В вашем личном вузовском помощнике. Теперь все важные события,
                новости и изменения у вас под рукой.
              </p>
              <p>Будьте на пульсе жизни университета вместе с нами!</p>

              <CustomButton color={"blue"} onClick={handleButtonClick}>
                <LogoDSTU/> Войти через МОЙДГТУ
              </CustomButton>
            </div>
          </Flex>
        </section>
      </div>
    </>
  );
};

export default Auth;

