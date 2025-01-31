import { Checkbox, FormControlLabel } from "@mui/material";

interface IChildrenChatItem {
  chat_id: number;
  name: string;
  selectedChatsId: number[];
  handleChange: (id: number, checked: boolean) => void;
}

export const ChildrenChatItem: React.FC<IChildrenChatItem> = ({
  chat_id,
  name,
  selectedChatsId,
  handleChange,
}) => {
  return (
    <FormControlLabel
      style={{ width: "100%" }}
      control={
        <Checkbox
          checked={selectedChatsId.includes(chat_id)}
          onChange={(e) => handleChange(chat_id, e.target.checked)}
        />
      }
      label={name}
    />
  );
};
