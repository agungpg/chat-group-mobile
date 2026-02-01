import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Typography from "@components/Typography";

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.accentBlobTop} />
      <View style={styles.accentBlobBottom} />
      <ActivityIndicator size="large" color="#363F47" />
      <Typography variant="display" style={styles.title}>
        SimpleAuth
      </Typography>
      <Typography variant="label" style={styles.subtitle}>
        Checking credentials…
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EBF0",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
  },
  title: {
    color: "#363F47",
    textAlign: "center",
  },
  subtitle: {
    color: "#4B5563",
    textAlign: "center",
  },
  accentBlobTop: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#D9E5F3",
    top: -40,
    right: -60,
    opacity: 0.65,
  },
  accentBlobBottom: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#D5DFE8",
    bottom: -60,
    left: -70,
    opacity: 0.55,
  },
});

export default SplashScreen;
