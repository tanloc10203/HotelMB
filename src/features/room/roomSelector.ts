import { useAppSelector } from "@/stores/hooks";

export const useRoom = () => useAppSelector((state) => state.room);
