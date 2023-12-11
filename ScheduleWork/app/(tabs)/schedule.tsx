import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../utils/globalStyles";
import { DateWithUsers, Group, User } from "../../utils/types";
import Loading from "../../components/Loading";
import DayDetails from "../../components/DayDetails";
import { useDispatch, useSelector } from "react-redux";
import { selectGroups, setGroups } from "../../slices/groupsSlice";
import { getUser } from "../../services/user";
import { router, useNavigation, usePathname } from "expo-router";
import CustomCalendar from "../../components/CustomCalendar";
import {
  selectSelectedGroupId,
  setSelectedGroupId,
} from "../../slices/invokeFunction";
import { StatusBar } from "expo-status-bar";
import { setLogsInStorage } from "../../utils/functions";
import { getGroupsInWorkPlace } from "../../services/group";
import { setWorkPlace } from "../../slices/workPlaceSlice";
import { getWorkPlace } from "../../services/workPlace";

const currentDate = new Date();

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<DateWithUsers>({
    date: currentDate,
    users: [],
  });
  const [user, setUser] = useState<User | null>(null);
  const [groupName, setGroupName] = useState("");
  const groups = useSelector(selectGroups);
  const navigation = useNavigation();
  const selectedGroupId = useSelector(selectSelectedGroupId);
  const pathname = usePathname();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Harmonogram ${groupName}`,
    });
  }, [groups, groupName]);

  useEffect(() => {
    const findGroupName = groups.find(
      (group: Group) => group?.id.toString() === selectedGroupId.toString(),
    )?.name;
    setGroupName(findGroupName ? findGroupName : "");
    setSelectedDate({ date: currentDate, users: [] });
  }, [selectedGroupId, groups]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("my-key");
        if (jsonValue != null) {
          if (!JSON.parse(jsonValue).user.id) {
            router.push("/login");
          }

          const userFromDb = await getUser(
            JSON.parse(jsonValue).authToken,
            JSON.parse(jsonValue).user?.id,
          );
          if (userFromDb.status === 200) {
            setUser(await userFromDb.json());
          } else if (userFromDb.status === 401) {
            await AsyncStorage.removeItem("my-key");

            router.push("/");

            router.push("/messageModal");
            router.setParams({
              message: "Zostałeś automatycznie wylogowany",
              type: "ERROR",
            });
          }
        }
      } catch (e) {
        alert("Coś poszło nie tak, spróbuj włączyć od nowa aplikacje");
        setLogsInStorage({
          file: "/drawer/schedule",
          error: "trycatch",
          date: new Date(),
        });
      }
    };

    getData();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("działą sueEffect");
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("my-key");
        if (jsonValue != null) {
          if (!JSON.parse(jsonValue).user.id) {
            router.push("/login");
          }

          const userFromDb = await getUser(
            JSON.parse(jsonValue).authToken,
            JSON.parse(jsonValue).user?.id,
          );

          if (userFromDb.status === 401) {
            await AsyncStorage.removeItem("my-key");

            router.push("/");

            router.push("/messageModal");
            router.setParams({
              message: "Zostałeś automatycznie wylogowany",
              type: "ERROR",
            });
          }

          const user = await userFromDb.json();

          if (user && user.workPlaceId) {
            await AsyncStorage.setItem(
              "my-key",
              JSON.stringify({
                authToken: JSON.parse(jsonValue).authToken,
                user,
              }),
            );

            const workPlace = await getWorkPlace(
              JSON.parse(jsonValue).authToken,
              user.workPlaceId,
            );
            if (workPlace.status === 200) {
              dispatch(setWorkPlace(await workPlace.json()));
            } else if (workPlace.status === 401) {
              router.push("/messageModal");
              router.setParams({
                message: "Nie jesteś przydzielony do żadnego miejsca pracy",
                type: "ERROR",
              });
            } else {
              alert("Coś poszło nie tak, spróbuj włączyć od nowa aplikacje");
            }
          }
        }
      } catch (e) {
        alert("Coś poszło nie tak, spróbuj włączyć od nowa aplikacje");
        setLogsInStorage({
          file: "/drawer/layout",
          error: "trycatch",
          date: new Date(),
        });
      }
    };

    if (pathname === "/schedule") {
      console.log(pathname, "dada");
      getData();
    }
  }, [pathname]);

  useEffect(() => {
    const tryGetGroupsData = async () => {
      const jsonValue = await AsyncStorage.getItem("my-key");

      if (jsonValue != null && JSON.parse(jsonValue)?.user?.workPlaceId) {
        const groups = await getGroupsInWorkPlace(
          JSON.parse(jsonValue).authToken,
          JSON.parse(jsonValue)?.user?.workPlaceId,
        );

        if (groups.status === 200) {
          const groupsData = await groups.json();
          dispatch(setGroups(groupsData));
          const findMyGroup = groupsData.find(
            (group: Group) => group.id === JSON.parse(jsonValue)?.user?.groupId,
          );
          if (findMyGroup) {
            dispatch(setSelectedGroupId(findMyGroup.id));
          }
        } else {
          setLogsInStorage({
            file: "/drawer/layout",
            error: "error tryGetGroupsData",
            date: new Date(),
          });
        }
      }
    };

    tryGetGroupsData();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider style={[styles.container]}>
      <StatusBar style="light" />
      {user && user?.workPlaceId ? (
        <>
          <CustomCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <DayDetails selectedDate={selectedDate.date} />
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.textHeader}>
            Aktualnie nie należysz do żadnego miejsca pracy
          </Text>
          <Text style={styles.textDescription}>
            Poproś pracodawce o dodanie
            <Text style={{ color: colors.baseColor, fontWeight: "bold" }}>
              {" "}
              {user?.email}{" "}
            </Text>
          </Text>
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    // marginTop: -10
    paddingTop: 10,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    gap: 20,
  },
  textHeader: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
  textDescription: {
    textAlign: "center",
  },
});
