import { Dimensions, PixelRatio } from "react-native";

const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get("window").width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get("window").height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const aggregate = (arr, key) => {
  const aggregation = [];

  arr.reduce((prev, current, index) => {
    if (index === 1) {
      aggregation.push(prev[key]);
    }
    if (aggregation.filter((value) => value === current[key]).length === 0) {
      aggregation.push(current[key]);
    }
  });
  return aggregation;
};

export { widthPercentageToDP, heightPercentageToDP, aggregate };
