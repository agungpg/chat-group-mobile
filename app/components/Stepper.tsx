import { Fragment, memo } from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import Typography from "./Typography";

type Step = {
  id: string;
  label: string;
};

interface StepperProps {
  steps: Step[];
  currentStepIndex: number;
}

const PRIMARY_COLOR = "#C73C80";
const DONE_BACKGROUND = "#34C759";
const DONE_TEXT = "#FFFFFF";
const DONE_LABEL = "#34C759";
const DONE_CONNECTOR = "#A8E6BF";
const ACTIVE_BACKGROUND = PRIMARY_COLOR;
const ACTIVE_LABEL = PRIMARY_COLOR;
const ACTIVE_CONNECTOR = "#E8A6C4";
const UPCOMING_BACKGROUND = "#FFFFFF";
const UPCOMING_BORDER = "#D1D5DB";
const UPCOMING_TEXT = "#6B7280";
const UPCOMING_CONNECTOR = "#D1D5DB";

type StepNodeProps = {
  step: Step;
  isDone: boolean;
  isLast: boolean;
  isActive: boolean;
  stepNumber: number;
};

const StepNode = ({ step, isDone, isLast, isActive, stepNumber }: StepNodeProps) => {
  const isUpcoming = !isDone && !isActive;
  const badgeBackground = isDone ? DONE_BACKGROUND : isActive ? ACTIVE_BACKGROUND : UPCOMING_BACKGROUND;
  const badgeTextColor = isDone || isActive ? DONE_TEXT : UPCOMING_TEXT;
  const connectorColor = isDone ? DONE_CONNECTOR : isActive ? ACTIVE_CONNECTOR : UPCOMING_CONNECTOR;
  const connectorStyle = { ...styles.connector, borderBottomColor: connectorColor };
  const badgeBorderStyle = isUpcoming ? { borderColor: UPCOMING_BORDER, borderWidth: 1 } : null;
  const labelColor = isDone ? DONE_LABEL : isActive ? ACTIVE_LABEL : UPCOMING_TEXT;

  return (
    <Fragment key={step.id}>
      <View style={styles.stepItem}>
        <Button
          textStyle={styles.badgeText}
          backgroundColor={badgeBackground}
          textColor={badgeTextColor}
          label={`${stepNumber}`}
          style={[styles.badge, badgeBorderStyle]}
        />
        <Typography
          color={labelColor}
          variant="body"
          style={styles.stepLabel}
        >
          {step.label}
        </Typography>
      </View>
      {!isLast && <View style={connectorStyle} />}
    </Fragment>
  );
};

const StepperComponent = ({
  steps: stepList,
  currentStepIndex: activeStepIndex,
}: StepperProps) => (
  <View style={styles.container}>
    {stepList.map((step, index) => {
      const isActive = index === activeStepIndex;
      const isLast = index === stepList.length - 1;

      return (
        <StepNode
          isDone={index < activeStepIndex}
          key={step.id}
          step={step}
          isLast={isLast}
          isActive={isActive}
          stepNumber={index + 1}
        />
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 4,
    justifyContent: "space-between",
    backgroundColor: "#F2F2F2",
    padding: 16,
    borderColor: "#D9DDE2",
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  stepItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badge: {
    borderRadius: "100%",
    height: 32,
    width: 32,
    padding: 0,
    paddingHorizontal: 0,
  },
  badgeText: {
    fontWeight: 700,
  },
  stepLabel: {
    fontWeight: 700,
  },
  connector: {
    borderBottomWidth: 2,
    borderStyle: "dashed",
    flex: 1,
    marginHorizontal: 4,
  },
});

export default memo(StepperComponent);
