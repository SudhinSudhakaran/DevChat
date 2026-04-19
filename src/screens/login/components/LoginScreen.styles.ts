import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  appName: {
    textAlign: "center",
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1E293B",

    padding: 20,
    borderRadius: 20,
    width: responsiveWidth(100),
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 0
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 5,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  footerText: {
    color: "#94A3B8",
  },

  signup: {
    color: "#38BDF8",
    marginLeft: 5,
    fontWeight: "600",
  },
});