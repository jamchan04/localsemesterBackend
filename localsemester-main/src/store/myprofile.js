import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMyProfile = create(
  persist(
    (set, get) => ({
      myProfile: {
        id: "",
        username: "",
        email: "",
        state: "",
        profilePhoto: "",
        message: "",
      },
      setMyProfile: (newProfile) =>
        set(() => ({
          myProfile: { ...newProfile },
        })),

      getMyProfile: () => get().myProfile,

      editMyProfile: (arg, value) =>
        set((state) => ({
          myProfile: {
            ...state.myProfile,
            [arg]: value,
          },
        })),
    }),

    {
      name: "myProfile",
    }
  )
);
