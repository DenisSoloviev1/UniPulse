import React from "react";
import { Flex, Tag, Container, ModalWindow, CustomButton } from "../components";
import { useAddTagStore } from "../components/ModalWindow/store";
import styles from "../components/ModalWindow/styles.module.scss";
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
            <div className={styles.slider}>
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
