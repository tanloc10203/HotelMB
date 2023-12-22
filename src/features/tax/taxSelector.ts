import { useAppSelector } from "@/stores/hooks";

export const useTax = () => useAppSelector((state) => state.tax);
