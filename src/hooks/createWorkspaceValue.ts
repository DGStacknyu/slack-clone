import { create } from "zustand";

type CreateWorkspaceValue = {
  name: string;
  imageUrl: string;
  updateImageUrl: (url: string) => void;
  updateValues: (values: Partial<CreateWorkspaceValue>) => void;
  currStep: number;
  setCurrStep: (step: number) => void;
};
export const useCreateWorkspaceValue = create<CreateWorkspaceValue>((set) => ({
  name: "",
  imageUrl: "",
  updateImageUrl: (url) => set({ imageUrl: url }),
  updateValues: (values) => set(values),
  currStep: 1,
  setCurrStep: (step) => set({ currStep: step }),
}));
