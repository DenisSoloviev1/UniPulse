import React from "react";
import classNames from "classnames";
import style from "./style.module.scss";
import Flex from "../../components/Flex";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import Tag from "../../components/tag";
import { arrayTag } from "../../assets/date";

interface AddTagProps {
  show: boolean;
  onClick: () => void;
}
const AddTag: React.FC<AddTagProps> = ({ show, onClick }) => {
  return (
    <div
      className={classNames(style.addTag, show ? style.show : "")}
      onClick={onClick}
    >
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        <Flex title={"Существующие теги"} className={"row"}>
          <div className={style.slider}>
            {arrayTag.map((tag) => (
              <Tag key={tag.id} id={tag.id} name={tag.name} />
            ))}
          </div>
        </Flex>
        <form action="">
          <Flex title={"Новый тег"}>
            <Container>
              <input type="text" placeholder="Название тега" />
            </Container>
            <Container>
              <input type="text" placeholder="Контингент" />
            </Container>
            <CustomButton onClick={onClick} color={"blue"}>
              Создать
            </CustomButton>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default AddTag;
