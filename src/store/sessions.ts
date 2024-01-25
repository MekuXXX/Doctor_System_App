import { create } from "zustand";

interface SessionsState {
  sessions: number;
  setSessions: (sessions: number) => void;
}

export const useSessions = create<SessionsState>((set) => ({
  sessions: 0,
  setSessions: (numberSessions: number) =>
    set((state) => ({
      ...state,
      sessions: (state.sessions += numberSessions),
    })),
}));
