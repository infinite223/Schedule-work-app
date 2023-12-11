import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { FC } from "react";
import { colors } from "../../utils/globalStyles";
import { UserInDay } from "../../utils/types";
import { getColorDot } from "../../utils/functions";

const widthScreen = Dimensions.get("window").width;

const widthDay = (widthScreen - 20) / 7;

interface DayProps {
  id: number;
  isSelected: boolean;
  users: UserInDay[];
  myId: string;
}

const Day: FC<DayProps> = ({ id, isSelected, users, myId }) => {
  const findUser = users.find((userInDay) => userInDay.user?.id === myId);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isSelected ? colors.baseColor : "white",
          backgroundColor: findUser ? "rgba(11, 250, 43, .1)" : "white",
        },
      ]}
    >
      <Text style={[styles.textDay, { color: isSelected ? "black" : "black" }]}>
        {id !== 0 && id}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        {users.map((userInDay, id) => (
          <View
            key={id}
            style={[styles.dot, { backgroundColor: getColorDot(userInDay) }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    width: widthDay,
    height: widthDay,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
    gap: 2,
  },
  textDay: {
    fontSize: 14,
  },
  dot: {
    borderRadius: 50,
    width: 5,
    height: 5,
  },
});

export default Day;
