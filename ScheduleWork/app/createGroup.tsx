import {
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { colors, globalStyles } from "../utils/globalStyles";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createGroup } from "../services/group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectGroups, setGroups } from "../slices/groupsSlice";
import { useDispatch, useSelector } from "react-redux";
const widthScreen = Dimensions.get("screen").width;

const createGroupModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const [lockbutton, setLockbutton] = useState(false);

  const tryCreateGroup = async () => {
    if (name.length > 3) {
      setLockbutton(true);
      const jsonValue = await AsyncStorage.getItem("my-key");
      if (jsonValue) {
        const res = await createGroup(
          name,
          description,
        );

        if (res.status === 200) {
          const newGroup = await res.json();

          if (newGroup) {
            dispatch(setGroups([...groups, newGroup]));
          }

          router.back();
          router.push("/messageModal");
          router.setParams({
            message: "Utworzono nową grupe",
            type: "SUCCESS",
          });
        } else {
          router.push("/messageModal");
          router.setParams({ message: "Nie prawidłowy kod", type: "ERROR" });
        }
      }
      setLockbutton(false);
    } else {
      router.push("/messageModal");
      router.setParams({
        message: "Nazwa grupy musi być dłuższa",
        type: "ERROR",
      });
    }
  };

  return (
    <Pressable style={[styles.container]} onPress={() => router.back()}>
      <Pressable
        onPress={() => {}}
        style={[styles.content, globalStyles.boxShadow]}
      >
        <Text style={styles.mainText}>Utwórz nową grupę</Text>
        <Text style={styles.descriptionText}>Podaj potrzebne informacje</Text>
        <TextInput
          placeholder="Nazwa grupy"
          style={[styles.input, globalStyles.boxShadow]}
          value={name}
          onChangeText={setName}
          placeholderTextColor={"rgba(23, 23, 23, .4)"}
        />

        <TextInput
          placeholder="Opis grupy (opcjonalnie)"
          style={[styles.input, globalStyles.boxShadow]}
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={"rgba(23, 23, 23, .4)"}
        />

        <TouchableOpacity
          onPress={tryCreateGroup}
          disabled={lockbutton}
          style={[
            styles.inviteButton,
            globalStyles.boxShadow,
            { opacity: lockbutton ? 0.2 : 1 },
          ]}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Utwórz</Text>
          <Ionicons name="arrow-forward-outline" size={20} color="white" />
        </TouchableOpacity>
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

export default createGroupModal;
