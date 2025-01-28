import { IFile } from "../../../shared/types";
import { FileSvg, ImageSvg, VideoSvg } from "../../../shared/ui/Icon";
import { Files } from "./style";

export const Icons = ({ files }: { files: IFile[] | null }) => {
  if (!files) return null;

  let hasImage = false;
  let hasVideo = false;
  let hasSvg = false;
  let hasOther = false;

  files.forEach((file) => {
    if (
      file.type === "image" ||
      (file.type === "application" && file.fileName?.endsWith(".svg"))
    ) {
      hasImage = true;
    }
    if (file.type === "video") {
      hasVideo = true;
    }
    if (file.type === "application" && file.fileName?.endsWith(".svg")) {
      hasSvg = true;
    }
    if (
      file.type !== "image" &&
      file.type !== "video" &&
      !(file.type === "application" && file.fileName?.endsWith(".svg"))
    ) {
      hasOther = true;
    }
  });

  return (
    <Files>
      {hasImage && <ImageSvg />}
      {hasVideo && <VideoSvg />}
      {hasSvg && !hasImage && <ImageSvg />}
      {hasOther && <FileSvg />}
    </Files>
  );
};
