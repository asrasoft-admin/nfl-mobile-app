import { StyleSheet } from "react-native";
import { colors } from "../../assets/colors";
import { widthPercentageToDP as wp } from "../../utils/responsive";
import { fontFamily } from "../../assets/fonts";

export default StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: wp("11.75"),
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 10,
    borderRadius: wp(2),
    color: colors.gray4,
    fontFamily: fontFamily.MontserratBold,
  },
  textError: {
    fontSize: wp("3"),
    color: "red",
    marginLeft: wp(1),
    fontFamily: fontFamily.MontserratBold,
  },
});
