import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store";
import { View } from "react-native";
import { colors } from "../utils/globalStyles";
import { AuthProvider } from "./../hooks/useAuth";

export default function Layout() {
  return (
    <AuthProvider>
    <Provider store={store}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="timelineWork"
            options={{
              headerTitle: "Najbliższe dni pracy",
              headerTitleStyle: {
                fontSize: 17,
              },
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              headerTitle: "Ustawienia",
              headerTitleStyle: {
                fontSize: 17,
              },
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="editUser"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              headerTitleStyle: {
                fontSize: 17,
              },
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="loadingModal"
            options={{
              presentation: "modal",
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="messageModal"
            options={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="selectHoursModal"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="inviteWorkerModal"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="createGroup"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="informationModal"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="editGroup"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="addUserToGroup"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="logsListModal"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="countHoursModal"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade_from_bottom",
            }}
          />
        </Stack>
    </Provider>
      </AuthProvider>
  );
}
