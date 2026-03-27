import { StyleSheet, View } from "react-native"
import Typography from "./Typography"
import { COLORS } from "app/constants/token";

const StepperV2 = ({
  data = [
    {
      key: "acount-setup",
      label: "Account Setup",
    },
    {
      key: "profile-setup",
      label: "Profile Setup",
    },
    {
      key: "review",
      label: "Review",
    }
  ],
  activeStep = 1
}) => {
  const DoneStepPercentage = (100 / (data.length / activeStep)).toFixed(2) || 0;

  const {label} = data[activeStep];
  return <View style={styles.container}>
    <View style={styles.textSection}>
      <Typography style={{fontSize: 28}} variant="title">{label}</Typography>
      <Typography variant="body" style={styles.textStep}>{`Step ${activeStep} of ${data.length}`}</Typography>
    </View>
    <View style={styles.progressBar}>
      <View style={[styles.progressBarDone, {width: `${DoneStepPercentage as number}%`}]}></View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 4,
    gap: 4
  },
  textSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  textStep: {
    color: COLORS.primary,
    fontWeight: "700"
  },
  progressBar: {
    backgroundColor: COLORS.surfaceContainerHighest,
    width: "100%",
    height: 8,
    borderRadius: 8
  },
  progressBarDone: {
    backgroundColor: COLORS.primary,
    height: 8,
    borderRadius: 8
  }
})

export default StepperV2;