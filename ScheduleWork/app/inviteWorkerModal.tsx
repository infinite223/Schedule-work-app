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
import { addUserToWorkPlace } from "../services/workPlace";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLogsInStorage } from "../utils/functions";

const widthScreen = Dimensions.get("screen").width;

const Page = () => {
  const [email, setEmail] = useState("");

  const inviteWorker = async () => {
    const jsonValue = await AsyncStorage.getItem("my-key");
    if (jsonValue != null) {
      const res = await addUserToWorkPlace(
        JSON.parse(jsonValue).user.id,
        email,
      );

      if (res.status === 200) {
        router.back();

        router.push("/messageModal");
        router.setParams({
          message: `Użytkownik został dodany do miejsca pracy`,
          type: "SUCCESS",
        });
        setEmail("");
      }
      if (res.status === 401) {
        router.push("/messageModal");
        router.setParams({
          message: `Użytkownik nie istnieje w aplikacji`,
          type: "ERROR",
        });
      } else {
        router.push("/messageModal");
        router.setParams({ message: `Coś poszło nie tak`, type: "ERROR" });
        setLogsInStorage({
          file: "/inviteWorkerModal",
          error: "else",
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
        <Text style={styles.mainText}>Zaproś pracownika do aplikacji</Text>
        <Text style={styles.descriptionText}>
          wpisz poniżej jego email by dodać pracownika, pamiętaj że użytkownik
          musi mieć pierw utworzone konto w aplikacji
        </Text>
        <TextInput
          style={[styles.input, globalStyles.boxShadow]}
          placeholder="Email pracownika"
          placeholderTextColor={"rgba(23, 23, 23, .4)"}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          onPress={inviteWorker}
          style={[styles.inviteButton, globalStyles.boxShadow]}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Zaproś</Text>
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
    paddingVertical: 10,
    width: widthScreen - 50,
    maxWidth: 400,
  },
});

export default Page;
