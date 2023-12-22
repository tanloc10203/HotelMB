import { codesArray } from "@/constants/code";
import { appActions } from "@/features/app";
import { authActions } from "@/features/auth";
import authApi from "@/services/api/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import useSWR from "swr";

const useGetProfile = () => {
  const dispatch = useAppDispatch();

  const { data, error, isLoading, isValidating } = useSWR(
    authApi.getCacheKey({ type: "getProfile" }),
    authApi.getProfile,
    {
      revalidateIfStale: true,
      onSuccess(data, key, config) {
        if (!data) return;
        dispatch(authActions.setUser(data.metadata));
      },
      onError(err, key, config) {
        const { response } = err;
        console.log(`onError`, JSON.stringify(err.response?.data.message, null, 4));

        dispatch(appActions.setLoading(false));

        if (err.response?.data.message === "jwt expired") {
          // TODO: delete auth
          dispatch(authActions.setAccessToken(null));
          dispatch(authActions.setUser(null));
        }

        if (response && response?.data) {
          const { code } = response.data;

          if (codesArray.includes(code)) {
            // TODO: delete auth
            dispatch(authActions.setAccessToken(null));
            dispatch(authActions.setUser(null));
          }
        }
      },
      onErrorRetry(err, key, config, revalidate, revalidateOpts) {
        if (revalidateOpts.retryCount >= 3) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount: revalidateOpts.retryCount }), 5000);
      },
    }
  );

  // console.log(
  //   ` { data, error, isLoading, isValidating }:`,
  //   JSON.stringify({ data, error, isLoading, isValidating }, null, 4)
  // );

  return { data, error, isLoading, isValidating };
};

export default useGetProfile;
