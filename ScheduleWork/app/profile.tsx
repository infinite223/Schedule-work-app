import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { Group, User } from "../utils/types";
import Loading from "../components/Loading";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { getUser } from "../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, globalStyles } from "../utils/globalStyles";
import * as Linking from "expo-linking";
import { useSelector } from "react-redux";
import { selectGroups } from "../slices/groupsSlice";
import { selectWorkPlace } from "../slices/workPlaceSlice";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const { userId }: { userId: string } = useLocalSearchParams();
  const groups: Group[] = useSelector(selectGroups);
  const workplace = useSelector(selectWorkPlace);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isMyProfile ? "Twój profil" : user?.name,
      headerRight: () => {
        !loading && (
          <View>
            {!isMyProfile ? (
              <View style={styles.rightOptions}>
                <TouchableOpacity
                  style={{ padding: 7 }}
                  onPress={() => Linking.openURL(`:${user?.phoneNumber}`)}
                >
                  <AntDesign name="message1" size={22} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.phoneButton}
                  onPress={() => Linking.openURL(`tel:${user?.phoneNumber}`)}
                >
                  <Entypo name="phone" color={"white"} size={18} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.rightOptions}>
                <TouchableOpacity
                  onPress={() => router.push("/editUser")}
                  style={{ padding: 7 }}
                >
                  <Feather name="edit-3" size={23} color={"black"} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      },
    });
  }, [user, isMyProfile]);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem("my-key");
      if (jsonValue) {
        const res = await getUser(userId);

        if (res.status === 200) {
          setUser(await res.json());

          if (JSON.parse(jsonValue)?.id?.toString() === userId) {
            setIsMyProfile(true);
          } else {
            setIsMyProfile(false);
          }
        } else {
          alert("Coś poszło nie tak, spróbuj włączyć od nowa aplikacje");
        }
      }
      setLoading(false);
    };

    getUserData();
  }, [userId]);

  if (!user) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {loading && <Loading />}

      {!loading && (
        <View style={styles.headerContainer}>
          <View
            style={[
              styles.item,
              {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.baseColor,
              },
            ]}
          >
            <Ionicons
              name="person-sharp"
              size={20}
              style={{ marginRight: 17 }}
              color={"white"}
            />

            <View style={[styles.dataContainer]}>
              <Text style={{ color: "white", fontSize: 12 }}>Imię:</Text>
              <Text style={[styles.name, { color: "white" }]}>{user.name}</Text>
            </View>
          </View>

          <View style={[styles.item]}>
            <Text style={{ fontSize: 12 }}>Nick:</Text>
            <Text style={styles.userName}>{user.userName}</Text>
          </View>
        </View>
      )}

      {!loading && (
        <View>
          {workplace.adminId?.toString() === user?.id?.toString() ? (
            <Text style={styles.leftText}>
              {isMyProfile ? "Jesteś " : "Jest to "}
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                administrator miejsca pracy/szef
              </Text>
            </Text>
          ) : (
            <Text style={styles.leftText}>
              {isMyProfile ? "Należysz" : "Należy"} do grupy:{" "}
              <Text style={{ fontSize: 15, fontWeight: "700" }}>
                {groups.find((group) => group.id === user.groupId)?.name}
              </Text>
            </Text>
          )}
        </View>
      )}

      {!loading && (
        <View>
          {!isMyProfile ? (
            <View style={styles.rightOptions}>
              {user?.phoneNumber && user?.phoneNumber > 100 ? (
                <>
                  <Text style={styles.leftText}>Zadzwoń do {user.name}: </Text>
                  <TouchableOpacity
                    style={[styles.phoneButton, globalStyles.boxShadow]}
                    onPress={() => Linking.openURL(`tel:${user?.phoneNumber}`)}
                  >
                    <Entypo name="phone" color={"white"} size={18} />
                  </TouchableOpacity>
                </>
              ) : (
                <View></View>
              )}
            </View>
          ) : (
            <View style={styles.rightOptions}>
              <Text style={styles.leftText}>Edytuj swój profil: </Text>
              <TouchableOpacity
                onPress={() => router.push("/editUser")}
                style={[styles.option, globalStyles.boxShadow]}
              >
                <Feather name="edit-3" size={20} color={"black"} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <View>{/* <Text>Najbliższe dni pracy:</Text> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightOptions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  dataContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: -1,
  },
  leftText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555",
  },
  option: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 9,
  },
  phoneButton: {
    backgroundColor: "#19f",
    borderRadius: 50,
    padding: 7,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 15,
    gap: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    marginTop: 20,
  },
  item: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 22,
    paddingRight: 25,
    paddingVertical: 10,
    borderRadius: 50,
    gap: -5,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
  },
});

export default Page;
