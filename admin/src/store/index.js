import create from "zustand";

export const useStore = create((set) => ({
  currentUser: {},
  allUser: [],
  isLoggedIn: false,
  loginUser: (user) => set((state) => ({ currentUser: user, isLoggedIn: true })),
  logoutUser: () => set((state) => ({ currentUser: {}, isLoggedIn: false })),
  setAllUser: (users) => set((state) => ({ allUser: users })),
  deleteUser: (id) => set((state) => ({ allUser: state.allUser.filter((user) => user._id !== id) })),
  addNewUser: (user) => set((state) => ({ allUser: [...state.allUser, user] })),
}));
