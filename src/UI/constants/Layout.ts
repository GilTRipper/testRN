import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const isSmallDevice = width <= 375;
const isSmallHeight = height <= 736;

export const Layout = { width, height, isSmallDevice, isSmallHeight };
