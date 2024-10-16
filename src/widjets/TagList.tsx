import React from "react";
import Flex from "../components/Flex";
import Tag from "../components/tag";
import Container from "../components/Container";
import ModalWindow from "../components/ModalWindow";
import CustomButton from "../components/CustomButton";
import {useAddTagStore} from "../components/ModalWindow/store";
import style from "../components/ModalWindow/style.module.scss";
import { arrayTag } from "../assets/date";

interface TagListProps {
  title: string;
}

const TagList: React.FC<TagListProps> = ({ title }) => {
  const openModal = useAddTagStore((state) => state.open);
  const closeModal = useAddTagStore((state) => state.close);

  return (
    <article>
      <Flex title={title} className={"row"}>
        {arrayTag.map((tag) => (
          <Tag key={tag.id} id={tag.id} name={tag.name} />
        ))}

        <ModalWindow>
          <Flex title={"Существующие теги"} className={"row"}>
            <div className={style.slider}>
              {arrayTag.map((tag) => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  isActive={false}
                />
              ))}
            </div>
          </Flex>

          <Flex title={"Новый тег"}>
            <Container>
              <input type="text" placeholder="Название тега" />
            </Container>
            <Container>
              <input type="text" placeholder="Контингент" />
            </Container>
            <CustomButton onClick={closeModal} color={"blue"}>
              Создать
            </CustomButton>
          </Flex>
        </ModalWindow>

        <CustomButton color={"blue"} onClick={openModal}>
          +
        </CustomButton>
      </Flex>
    </article>
  );
};

export default TagList;
