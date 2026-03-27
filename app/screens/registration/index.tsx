import React from "react";
import { View, StyleSheet } from "react-native";
import Stepper from "@components/Stepper";
import AccountSetup from "app/features/registrations/AccountSetup";
import ProfileSetup from "app/features/registrations/ProfileSetup";
import useRegistration from "app/features/registrations/hooks/useRegistration";
import StepperV2 from "@components/StepperV2";
import { COLORS } from "app/constants/token";


const RegistrationScreen = () => {
  const { step }  = useRegistration()

    const renderScreen = (screenIndex: number) => {
      return [
        <AccountSetup />,
        <ProfileSetup />
      ][screenIndex]
    }

    
    return <View style={styles.screenContainer}>
        {/* <Stepper 
          steps={[{
            label: "Account",
            id: "account-detail"
            }, {
            label: "Profile",
            id: "profile-setup"
            }, {
            label: "Preview",
            id: "preview"
            }
        ]} 
        currentStepIndex={step}
      /> */}
      <View style={{paddingHorizontal: 20}}>
        <StepperV2 />
      </View>
      {renderScreen(step)}
    </View>
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingVertical: 28,
    backgroundColor: COLORS.surface,
    height:" 100%",
  },
  container:{
    paddingHorizontal: 28,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  headerSection: {
    gap: 12
  },
  formInputSection: {
    gap: 12
  },
  actionsSection: {
    gap: 32
  },
  linkRow:{
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  linkButton: {
    height: "auto",
    paddingHorizontal: 0,
  },
  formAlertMsg: {
    textAlign: "center", 
    paddingBottom: 8
  }
})

export default RegistrationScreen;
