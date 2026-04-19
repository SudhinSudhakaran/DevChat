import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // dark futuristic
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  avatarWrapper: {
    padding: 4,
    borderRadius: 100,
    backgroundColor: "#22C55E",
    shadowColor: "#22C55E",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },

  name: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 12,
  },

  email: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  cardTitle: {
    color: "#38BDF8",
    fontSize: 14,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#334155",
  },

  rowText: {
    color: "#fff",
    fontSize: 15,
  },

  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});