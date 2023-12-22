import Navigation from "@/components/shared/Navigation";
import { linking } from "@/components/shared/Navigation/MainStack/MainStack";
import OverlayLoading from "@/components/ui/OverlayLoading";
import SnackbarOverride from "@/components/ui/SnackbarOverride";
import ToastConfig from "@/components/ui/ToastConfig";
import ThemeContextProvider from "@/contexts/ThemeContext";
import buildProvidersTree from "@/helpers/buildProvidersTree";
import rootSaga from "@/stores/rootSaga";
import store, { persistor, sagaMiddleware } from "@/stores/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

sagaMiddleware.run(rootSaga);

const ProvidersTree = buildProvidersTree([
  [Provider, { store }],
  [PersistGate, { loading: null, persistor: persistor }],
  [GestureHandlerRootView, { style: { flex: 1 } }],
  [BottomSheetModalProvider],
  [ThemeContextProvider, { linking: linking }],
]);

export default function App() {
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       // await new Promise((resolve) => setTimeout(resolve, 150));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       await SplashScreen.hideAsync();
  //     }
  //   }

  //   prepare();
  // }, []);

  return (
    <ProvidersTree>
      <Navigation />
      <SnackbarOverride />
      <Toast config={ToastConfig()} />
      <OverlayLoading />
    </ProvidersTree>
  );
}
