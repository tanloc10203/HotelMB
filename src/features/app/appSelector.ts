import { useAppSelector } from "@/stores/hooks";
import type { RootState } from "@/stores/store";

const loadingSelector = (state: RootState) => state.app.loading;
const asyncStoreIsChangeSelector = (state: RootState) => state.app.asyncStoreIsChange;

export const useLoading = () => useAppSelector(loadingSelector);
export const useAsyncStorageIsChange = () => useAppSelector(asyncStoreIsChangeSelector);
export const useSnackbar = () => useAppSelector((state) => state.app.snackbar);
export const useBanner = () => useAppSelector((state) => state.app.banners);
export const useHotel = () => useAppSelector((state) => state.app.hotels);
