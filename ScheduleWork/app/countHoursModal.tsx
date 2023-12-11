import { Text, View, Pressable, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, globalStyles } from "../utils/globalStyles";
import { router } from "expo-router";
import { monthNames } from "../utils/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import { getCurrentMonthUserInDays } from "../services/userInDay";
import { countAllHoursInMonth } from "../utils/functions";

const widthScreen = Dimensions.get("screen").width;
type MonthPrediction = {
  year: number;
  month: number;
  numberHoursFull: { hours: number; minutes: number };
  numberHoursNow: { hours: number; minutes: number };
};

const currentMonth = new Date().getMonth() + 1;

const Page = () => {
  const [monthPrediction, setMonthPrediction] =
    useState<MonthPrediction | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tryGetHoursPrediction = async () => {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem("my-key");
      if (jsonValue != null) {
        // const res = await getHoursPrediction(JSON.parse(jsonValue).authToken)
        const res = await getCurrentMonthUserInDays(
          JSON.parse(jsonValue).authToken,
        );
        console.log(res.status);
        if (res.status === 200) {
          const data = await res.json();
          const predictionHours = countAllHoursInMonth(data);

          setMonthPrediction(predictionHours[0]);
        }
      }
      setLoading(false);
    };

    tryGetHoursPrediction();
  }, []);
  console.log(monthPrediction);
  return (
    <Pressable style={[styles.container]} onPress={() => router.back()}>
      <Pressable
        onPress={() => {}}
        style={[styles.content, globalStyles.boxShadow_light]}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: 15,
            marginBottom: 10,
          }}
        >
          Przewidywanie aktualnego miesiąca
        </Text>

        {monthPrediction && !loading ? (
          <View style={[styles.monthItem, globalStyles.boxShadow]}>
            <View style={styles.name}>
              <Text style={styles.monthText}>
                {monthNames[monthPrediction.month]}
              </Text>
              <Text style={styles.text}>{monthPrediction.year}</Text>
            </View>
            <View style={{ gap: 2 }}>
              <View style={styles.valueContainer}>
                <Text style={styles.nameText}>
                  {currentMonth !== monthPrediction.month
                    ? "ilość godzin do teraz:"
                    : "ilość godzin:"}
                </Text>
                <Text style={styles.numberHoursNowText}>
                  {monthPrediction.numberHoursNow.hours}h {""}
                  {monthPrediction.numberHoursNow.minutes}m
                </Text>
              </View>

              {currentMonth !== monthPrediction.month && (
                <View style={styles.valueContainer}>
                  <Text style={styles.nameText}>
                    ilość godzin do końca miesiąca:
                  </Text>
                  <Text style={styles.numberHoursFullText}>
                    {monthPrediction.numberHoursFull.hours}h {""}
                    {monthPrediction.numberHoursFull.minutes}m
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <Loading />
        )}
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
  monthItem: {
    flexDirection: "row",
    justifyContent: "space-between",

    gap: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 6,
    backgroundColor: "white",
  },
  nameText: {
    fontSize: 12,
    fontWeight: "300",
  },
  name: {
    flexDirection: "column",
  },
  monthText: {
    fontWeight: "700",
    fontSize: 15,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-end",
  },
  numberHoursNowText: {
    color: colors.baseColor,
    fontWeight: "700",
    fontSize: 25,
  },
  numberHoursFullText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
  },
  text: {
    fontWeight: "300",
    fontSize: 12,
  },
  fileText: {},
  button: {
    backgroundColor: colors.errorColor,
    borderRadius: 50,
    width: "100%",
    paddingVertical: 10,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  content: {
    width: widthScreen - 20,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    paddingVertical: 15,
    flex: 1,
    marginTop: 150,
    gap: 10,
  },
  appVersion: {
    fontWeight: "400",
    fontSize: 10,
    alignSelf: "center",
    paddingVertical: 5,
  },
});

export default Page;
