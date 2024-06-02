import { Platform } from "react-native";
import { io } from "socket.io-client";
export const BaseUrl =
  Platform.OS === "android" ? "http://10.0.2.2:5000/" : "http://192.68.52.122:5000";

export const socket = io.connect("http://10.0.2.2:5000/");