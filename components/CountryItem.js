import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CountryItem = ({ country, ab, id, onPress }) => {
  const handleOnPress = () => {
    onPress();
  };

  //https://www.countryflags.io/${ab}/flat/64.png
  return (
    <TouchableWithoutFeedback style={styles.touchable} onPress={handleOnPress}>
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={{
                uri: `https://disease.sh/assets/img/flags/${ab.toLowerCase()}.png`,
              }}
            ></Image>
          </View>

          <Text style={styles.country_name}>{`${country}`}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  country_name: {
    fontFamily: "RobotoMedium",
    fontSize: wp("5%"),
    color: "#394048",
    paddingTop: hp("2.5%"),
    paddingLeft: wp("5%"),
  },
  touchable: {
    marginVertical: wp("1%"),
    marginHorizontal: wp("2%"),
    width: wp("90%"),
    height: hp("8.5%"),
    backgroundColor: "blue",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    width: wp("85%"),
    height: hp("8.5%"),
    marginLeft: wp("2%"),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
  },
  image_container: {
    marginTop: hp("1%"),
    marginLeft: wp("3.6%"),
    width: wp("13%"),
    height: wp("13%"),
  },
});

export default CountryItem;
