import { Tabs } from "expo-router/tabs";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { User } from "../../utils/types";
import { selectWorkPlace } from "../../slices/workPlaceSlice";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "../../utils/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const workPlace = useSelector(selectWorkPlace);

  useEffect(() => {
    const getUserFromStorage = async () => {
      const jsonValue: any = await AsyncStorage.getItem("my-key");
      setUser(jsonValue != null ? JSON.parse(jsonValue).user : null);
      setIsAdmin(workPlace.adminId === user?.id.toString());
    };

    getUserFromStorage();
  }, [workPlace]);
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderTopColor: "white",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="groups"
        options={{
          tabBarLabel: "Grupy",
          // headerShown:false,
          title: "Dostępne grupy",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              size={28}
              style={{ marginBottom: -3 }}
              name="account-group-outline"
              color={focused ? colors.baseColor : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          headerTitleStyle: { fontSize: 18, color: "white" },
          headerStyle: { backgroundColor: colors.baseColor },
          headerTintColor: "white",
          tabBarLabel: "Grafik",
          title: "Grafik",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              size={28}
              style={{ marginBottom: -3 }}
              name="calendar"
              color={focused ? colors.baseColor : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="options"
        options={{
          tabBarLabel: "Opcje",
          headerShown: false,
          title: "Opcje",
          tabBarIcon: ({ focused }) => (
            <Entypo
              size={28}
              style={{ marginBottom: -3 }}
              name="menu"
              color={focused ? colors.baseColor : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
