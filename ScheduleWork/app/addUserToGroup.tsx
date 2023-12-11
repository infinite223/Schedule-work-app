import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, globalStyles } from "../utils/globalStyles";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { addUserToGroup, getGroupsInWorkPlace } from "../services/group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setGroups } from "../slices/groupsSlice";
import { User } from "../utils/types";
import { getUsersWithOutGroup } from "../services/user";
import { setLogsInStorage } from "../utils/functions";
import Loading from "../components/Loading";

const widthScreen = Dimensions.get("screen").width;

type ParamsTypes = {
  groupName: string;
  groupId: string;
  groupDescription: string;
};

const Page = () => {
  const { groupName, groupId }: ParamsTypes = useLocalSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsersData = async () => {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem("my-key");

      if (jsonValue != null) {
        const res = await getUsersWithOutGroup(
          JSON.parse(jsonValue).authToken,
          JSON.parse(jsonValue).user.workPlaceId,
        );

        if (res.status === 200) {
          setUsers(await res.json());
        } else {
          setLogsInStorage({
            file: "/addUserToGroup",
            error: "getUsersData",
            date: new Date(),
          });
        }
      }

      await setLoading(false);
    };

    getUsersData();
  }, []);

  const tryAddUserToGroup = async (user: User) => {
    const jsonValue = await AsyncStorage.getItem("my-key");

    if (jsonValue != null) {
      const res = await addUserToGroup(
        JSON.parse(jsonValue).authToken,
        user.id,
        groupId,
      );

      if (res.status === 200) {
        console.log(res.status);
        const groups = await getGroupsInWorkPlace(
          JSON.parse(jsonValue).authToken,
          JSON.parse(jsonValue)?.user.workPlaceId,
        );

        if (groups.status === 200) {
          dispatch(setGroups(await groups.json()));
          router.back();
        }
      } else {
        setLogsInStorage({
          file: "/addUserToGroup",
          error: "tryAddUserToGroup",
          date: new Date(),
        });
      }
    }
  };

  return (
    <Pressable style={[styles.container]} onPress={() => router.back()}>
      <Pressable
        onPress={() => {}}
        style={[styles.content, globalStyles.boxShadow]}
      >
        <Text style={styles.mainText}>Dodaj osoby do grupy {groupName}</Text>
        <Text style={styles.descriptionText}>Dostępne osoby:</Text>

        {!loading ? (
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => tryAddUserToGroup(item)}
                style={[styles.userItem, globalStyles.boxShadow]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.userName}>{item.userName}</Text>
                  </View>
                </View>

                <Ionicons name="add-outline" size={22} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={{ height: 40 }}>
            <Loading />
          </View>
        )}

        {users.length === 0 && !loading && (
          <View style={styles.noUsers}>
            <Text style={{ fontWeight: "400" }}>
              Brak pracowników do dodania do grupy
            </Text>
          </View>
        )}

        {/* <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity 
            onPress={tryEditGroup}
            style={[styles.inviteButton, globalStyles.boxShadow]}
          >
            <Text style={{color: 'white', fontWeight: '700'}}>
                Edytuj grupę
            </Text>
            <Ionicons name="arrow-forward-outline" size={20} color="white" />
          </TouchableOpacity>
        </View> */}
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(1, 1, 1, .1)",
    width: widthScreen,
    height: "100%",
  },
  content: {
    width: widthScreen - 30,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    paddingVertical: 15,
    marginTop: -100,
    //   alignItems: 'center',
    gap: 10,
  },
  descriptionText: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 13,
    marginHorizontal: 10,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  inviteButton: {
    borderRadius: 50,
    backgroundColor: colors.baseColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 15,
  },
  userItem: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
  },
  userName: {
    fontSize: 13,
  },
  noUsers: {
    alignSelf: "center",
  },
});

export default Page;
