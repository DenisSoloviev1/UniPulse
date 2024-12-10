import React from "react";
import { Tag } from "../ui";
import { Flex } from "../../../shared/ui";
import { ITag, useTagStore } from "../model";
import { Message } from "../../notification";

interface TagListProps {
  initialTags: ITag[];
}

export const TagList: React.FC<TagListProps> = ({ initialTags }) => {
  const { selectedTags, setSelectedTags} = useTagStore();

  const handleTagClick = (id: ITag["id"]) => {
    const tag = initialTags.find((tag) => tag.id === id);
    if (!tag) return;

    const updatedTags = selectedTags.some(
      (selectedTag) => selectedTag.id === id
    )
      ? selectedTags.filter((selectedTag) => selectedTag.id !== id) // Удаляем тег, если он уже выбран
      : [...selectedTags, tag]; // Добавляем тег, если он ещё не выбран

    setSelectedTags(updatedTags);
  };

  return (
    <article>
      <Flex $direction={"row"} $wrap={true} $align={"center"}>
        {initialTags.length > 0 ? (
          initialTags.map((tag) => {
            const isSelected = selectedTags.some(
              (selectedTag) => selectedTag.id === tag.id
            );

            return (
              <Tag
                key={tag.id}
                id={tag.id}
                name={tag.name}
                style={isSelected ? "choice" : "normal"}
                onClick={() => handleTagClick(tag.id)}
              />
            );
          })
        ) : (
          <Message>Тегов нет</Message>
        )}
      </Flex>
    </article>
  );
};

// import React from "react";
// import { Tag } from "../ui";
// import { Flex } from "../../../shared/ui";
// import { ITag, useTagStore } from "../model";
// import { Message } from "../../notification";

// interface TagListProps {
//   initialTags: ITag[];
//   mode: "create" | "edit";
// }

// export const TagList: React.FC<TagListProps> = ({ initialTags, mode }) => {
//   const { 
//     selectedTags, 
//     setSelectedTags, 
//     selectedEditTags, 
//     setSelectedEditTags 
//   } = useTagStore();

//   // Определяем, какие состояния используются в зависимости от режима
//   const currentTags = mode === "edit" ? selectedEditTags : selectedTags;
//   const setCurrentTags =
//     mode === "edit" ? setSelectedEditTags : setSelectedTags;

//   const handleTagClick = (id: ITag["id"]) => {
//     const tag = initialTags.find((tag) => tag.id === id);
//     if (!tag) return;

//     const updatedTags = currentTags.some(
//       (selectedTag) => selectedTag.id === id
//     )
//       ? currentTags.filter((selectedTag) => selectedTag.id !== id) // Удаляем тег, если он уже выбран
//       : [...currentTags, tag]; // Добавляем тег, если он ещё не выбран

//     setCurrentTags(updatedTags);
//   };

//   return (
//     <article>
//       <Flex $direction={"row"} $wrap={true} $align={"center"}>
//         {initialTags.length > 0 ? (
//           initialTags.map((tag) => {
//             const isSelected = currentTags.some(
//               (selectedTag) => selectedTag.id === tag.id
//             );

//             return (
//               <Tag
//                 key={tag.id}
//                 id={tag.id}
//                 name={tag.name}
//                 style={isSelected ? "choice" : "normal"}
//                 onClick={() => handleTagClick(tag.id)}
//               />
//             );
//           })
//         ) : (
//           <Message>Тегов нет</Message>
//         )}
//       </Flex>
//     </article>
//   );
// };
