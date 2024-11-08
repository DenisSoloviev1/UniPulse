import {create} from "zustand";
import {typeTag} from "../model/type"

interface ITag {
    tag: typeTag;
    setTags: () => void;
  }

//   export const useAuthStore = create<ITag>((set) => ({

//   }));

