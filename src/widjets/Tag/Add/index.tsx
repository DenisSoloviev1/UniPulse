import { useState } from "react";
import {
  Flex,
  CustomButton,
  PlainTitle,
  ModalWindow,
  Slider,
  Loader,
  Skeleton,
} from "../../../shared/ui";
import { TagList } from "../../../entities/tag";
import { ComplitedSvg } from "../../../shared/ui/Icon";
import { useTagStore } from "../../../entities/tag";
import { Error } from "../../Notif/style";
import { useAuthStore } from "../../../entities/auth";
import { RolesDict } from "../../../shared/types";
import { useFetchTags } from "../../../shared/hooks/useFetchTags";
import { InputText } from "../../../shared/ui/InputText/InputText";
import { useCreateTag } from "../../../shared/hooks/useCreateTag";

export const AddTag = () => {
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");

  const { role } = useAuthStore();
  const { isLoadingTags } = useFetchTags();

  const { tags } = useTagStore();

  const { error, handleCreateTag, isLoading, isSuccess } = useCreateTag(
    tagDescription,
    tagName
  );

  const [show, setShow] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(!!error);

  return (
    <ModalWindow show={show} onClick={() => setShow(false)}>
      {isSuccess ? (
        <ComplitedSvg />
      ) : (
        <>
          <Flex>
            <PlainTitle>Существующие теги</PlainTitle>
            <Slider
              $height={role === RolesDict.MEDIA ? "200px" : "400px"}
              $wrap={true}
            >
              {isLoadingTags ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton key={index} $width="125px" />
                ))
              ) : (
                <TagList initialTags={tags} />
              )}
            </Slider>
          </Flex>

          {role === RolesDict.MEDIA && (
            <Flex $width={"100%"} $gap={15}>
              <Flex $width={"100%"}>
                <PlainTitle>Новый тег</PlainTitle>
                <InputText
                  type="text"
                  placeholder="название"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                />
                <InputText
                  type="text"
                  placeholder="описание"
                  value={tagDescription}
                  onChange={(e) => setTagDescription(e.target.value)}
                />
              </Flex>

              <Flex $width={"100%"} $align={"center"}>
                <CustomButton
                  type={"button"}
                  onClick={handleCreateTag}
                  $style={"blue"}
                  $width={"70%"}
                >
                  {isLoading ? <Loader size={"23px"} /> : "Создать"}
                </CustomButton>

                {error && (
                  <ModalWindow
                    onClick={() => setIsError(false)}
                    show={isError}
                    position={["", "", "30px", ""]}
                    width={"250px"}
                    height={"auto"}
                  >
                    <Error>{error}</Error>
                  </ModalWindow>
                )}
              </Flex>
            </Flex>
          )}
        </>
      )}
    </ModalWindow>
  );
};
