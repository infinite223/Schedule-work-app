import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { colors, globalStyles } from "../utils/globalStyles";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { removeGroup, updateGroup } from "../services/group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { selectGroups, setGroups } from "../slices/groupsSlice";
import { Group } from "../utils/types";

const widthScreen = Dimensions.get("screen").width;

type ParamsTypes = {
  groupName: string;
  groupId: string;
  groupDescription: string;
};

const Page = () => {
  const { groupName, groupId, groupDescription }: ParamsTypes =
    useLocalSearchParams();
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const [name, setName] = useState(groupName);
  const [description, setDescription] = useState(groupDescription);

  const tryEditGroup = async () => {
    const jsonValue = await AsyncStorage.getItem("my-key");

    if (jsonValue) {
      const res = await updateGroup(
        JSON.parse(jsonValue).authToken,
        name,
        description,
        groupId,
      );

      if (res.status === 200) {
        const updatedGroup = await res.json();
        let newGroups: Group[] = groups.filter(
          (group: Group) => group.id !== updatedGroup.id,
        );
        newGroups.push(updatedGroup);
        dispatch(setGroups(newGroups));

        router.back();
        router.push("/messageModal");
        router.setParams({
          message: "Udało się zaktualizować grupę",
          type: "SUCCESS",
        });
      } else {
        router.push("/messageModal");
        router.setParams({ message: "Coś poszło nie tak", type: "ERROR" });
      }
    }
  };

  const tryRemoveGroup = async () => {
    const jsonValue = await AsyncStorage.getItem("my-key");
    if (jsonValue) {
      const res = await removeGroup(JSON.parse(jsonValue).authToken, groupId);

      if (res.status === 200) {
        console.log(groupId, "groupId");
        console.log(groups, "groups");

        let newGroups: Group[] = groups.filter(
          (group: Group) => group.id.toString() !== groupId.toString(),
        );
        console.log(newGroups, "nowe grupy");
        dispatch(setGroups(newGroups));

        router.back();
        router.push("/messageModal");
        router.setParams({
          message: "Udało się usunąć grupę",
          type: "SUCCESS",
        });
      } else {
        router.push("/messageModal");
        router.setParams({ message: "Coś poszło nie tak", type: "ERROR" });
      }
    }
  };

  return (
    <Pressable style={[styles.container]} onPress={() => router.back()}>
      <Pressable
        onPress={() => {}}
        style={[styles.content, globalStyles.boxShadow]}
      >
        <Text style={styles.mainText}>Edytujesz grupę {groupName}</Text>

        <Text style={styles.descriptionText}>
          Zaaktualizuj nazwę oraz opis grupy
        </Text>

        <TextInput
          placeholder="Nazwa grupy"
          style={[styles.input, globalStyles.boxShadow]}
          value={name}
          onChangeText={setName}
          placeholderTextColor={"rgba(23, 23, 23, .4)"}
        />
        <TextInput
          placeholder="Opis grupy"
          style={[styles.input, globalStyles.boxShadow]}
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={"rgba(23, 23, 23, .4)"}
        />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            onPress={tryRemoveGroup}
            style={[styles.removeButton, globalStyles.boxShadow]}
          >
            <Text style={{ color: "black", fontWeight: "500" }}>
              Usuń grupę
            </Text>
            <Ionicons name="ios-trash-outline" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={tryEditGroup}
            style={[styles.inviteButton, globalStyles.boxShadow]}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Edytuj grupę
            </Text>
            <Ionicons name="arrow-forward-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
    gap: 10,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionText: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 13,
    marginHorizontal: 10,
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
  removeButton: {
    borderRadius: 50,
    borderColor: "lightgray",
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 15,
  },
  input: {
    borderWidth: 0,
    borderColor: "#aaa",
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: widthScreen - 50,
    maxWidth: 400,
  },
});

export default Page;
