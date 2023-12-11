import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../utils/types";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import logo from "./../../assets/images/logo.png";
import { useSelector } from "react-redux";
import { selectWorkPlace } from "../../slices/workPlaceSlice";
import { colors, globalStyles } from "../../utils/globalStyles";

const DrawerContent = () => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const workPlace = useSelector(selectWorkPlace);

  useEffect(() => {
    const getUserFromStorage = async () => {
      const jsonValue: any = await AsyncStorage.getItem("my-key");
      setUser(jsonValue != null ? JSON.parse(jsonValue).user : null);
      console.log(workPlace.adminId, "tutaj ", user?.id);
      setIsAdmin(workPlace.adminId === user?.id.toString());
    };

    getUserFromStorage();
  }, [workPlace]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable
        onPress={() => router.push("/(tabs)/schedule")}
        style={{ alignSelf: "center" }}
      >
        <Image
          style={{ width: 185, height: 50, marginBottom: 40, marginTop: 20 }}
          source={logo}
        />
      </Pressable>

      {user?.id && (
        <Link
          href={{ pathname: "/profile", params: { userId: user?.id } }}
          asChild
        >
          <TouchableOpacity style={styles.personDetails} activeOpacity={0.7}>
            <Ionicons name="person-sharp" size={25} color={"white"} />
            <View>
              <Text style={styles.nameText}>{user?.name}</Text>
              <Text style={styles.userNameText}>{user?.userName}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      )}
      <Text style={styles.headerText}>
        Zalogowany jako:
        {isAdmin ? " administrator" : " pracownik"}
      </Text>

      <View style={styles.main}>
        <View style={{ marginVertical: 20, gap: 5 }}>
          {isAdmin && (
            <TouchableOpacity
              onPress={() => router.push("/inviteWorkerModal")}
              style={[styles.item, globalStyles.boxShadow]}
            >
              <AntDesign name="addusergroup" size={23} color={"black"} />
              <Text style={styles.itemText}>Zaproś pracowników</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/groups")}
            style={styles.optionButton}
          >
            <MaterialCommunityIcons name="account-group-outline" size={23} />
            <Text style={styles.optionText}>Pokaż grupy</Text>
          </TouchableOpacity>

          {isAdmin && (
            <TouchableOpacity
              onPress={() => router.push("/createGroup")}
              style={styles.optionButton}
            >
              <MaterialCommunityIcons name="plus" size={23} />
              <Text style={styles.optionText}>Utwórz grupe</Text>
            </TouchableOpacity>
          )}

          {!isAdmin && (
            <TouchableOpacity
              onPress={() => router.push("/timelineWork")}
              style={styles.optionButton}
            >
              <MaterialCommunityIcons name="timeline-clock-outline" size={23} />
              <Text style={styles.optionText}>Najbliższe dni pracy</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.push("/settings")}
          style={styles.optionButton}
        >
          <Ionicons name="settings-outline" size={25} />
          <Text style={styles.optionText}>Ustawienia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 50,
    backgroundColor: "white",
  },
  headerText: {
    paddingHorizontal: 30,
    fontSize: 11,
    fontWeight: "400",
    marginTop: 10,
  },
  nameText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  userNameText: {
    fontWeight: "400",
    fontSize: 12,
    color: "white",
  },
  personDetails: {
    paddingHorizontal: 20,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.baseColor,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 10,
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 240,
    padding: 8,
    paddingHorizontal: 15,
    gap: 10,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "500",
  },
  item: {
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    width: 240,
    padding: 10,
    paddingHorizontal: 15,
    gap: 10,
    borderRadius: 50,
  },
  itemText: {
    fontSize: 14,
    color: "black",
    fontWeight: "700",
  },
});

export default DrawerContent;
