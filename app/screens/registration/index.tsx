import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomTextInput from "@components/IconTextInput";
import Button from "@components/Button";
import Typography from "@components/Typography";
import { AuthParamList, AuthRoutes } from "app/nagivations/AuthNavigation";
import { useValidation } from "app/validations/index";
import { SignUpSchema } from "app/validations/auth";
import { ApiError } from "app/api/client";
import { useRegisterMutation } from "app/hooks/useAuthApi";
const formInitialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const errorInitialState = {
  ...formInitialState,
};

type FormAlertType = "error" | "success" | null

type FormAlert = {
  type: FormAlertType; 
  message: string | null;
}

const RegistrationScreen = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<AuthParamList>>();
    const { validate, isLoading: isValidating } = useValidation();
    const registerMutation = useRegisterMutation();

    const [form, setForm] = useState(formInitialState);
    const [errors, setErrors] = useState(errorInitialState);
    const [FormAlert, setFormAlert] = useState<FormAlert>({
      type: null,
      message: null
    })

    const handleNameChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, name: value })),
      []
    );

    const handleEmailChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, email: value })),
      []
    );

    const handlePasswordChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, password: value })),
      []
    );

    const handleConfirmPasswordChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, confirmPassword: value })),
      []
    );

    const validateFormData = useCallback(async () => {
      setErrors(errorInitialState);
      setFormAlert({ type: null, message: null });
      const res = await validate(SignUpSchema, form);
      if (res) {
        setErrors(prev => ({
          ...prev,
          ...res
        }));
        return false;
      }
      return true;
    }, [form, validate]);

    const onSignupPress = useCallback(async () => {
      const isValid = await validateFormData();
      if (!isValid) return;

      registerMutation.mutate(
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        {
          onSuccess: () => {
            setFormAlert({
              type: "success",
              message: "Signup successful. You can login now.",
            });
            setForm(formInitialState);
          },
          onError: (error) => {
            const errMsg =
              error instanceof ApiError
                ? error.message
                : "Opps something went wrong";
            setFormAlert({
              type: "error",
              message: errMsg,
            });
          },
        }
      );
    }, [form, registerMutation, validateFormData]);

    const onLoginPress = useCallback(() => navigate(AuthRoutes.Login), [navigate]);

    const alertMsgColor = { color: FormAlert.type === "success" ? "#22C55E" : "#DC2626" }

    
    return <View style={styles.screenContainer}>
      <View style={styles.headerSection}>
        <Typography variant="display">Sign Up</Typography>
        <Typography variant="label">Hello! let's join with us</Typography>
      </View>
      <View style={styles.formInputSection}>
        <CustomTextInput 
          error={errors.name}
          leftIcon={{
            name: "person",
            size: 28,
          }}
          value={form.name} 
          onChangeText={handleNameChange} 
          placeholder="name..." 
        />  
        <CustomTextInput 
          error={errors.email}
          leftIcon={{
            name: "email",
            size: 28,
          }}
          value={form.email} 
          onChangeText={handleEmailChange} 
          placeholder="email..." 
        />  
        <CustomTextInput
          error={errors.password}
          leftIcon={{
            name: "key",
            size: 28,
          }}
          value={form.password} 
          onChangeText={handlePasswordChange} 
          placeholder="password..." 
          type="password" 
        />  
        <CustomTextInput
          error={errors.confirmPassword}
          leftIcon={{
            name: "key",
            size: 28,
          }}
          value={form.confirmPassword} 
          onChangeText={handleConfirmPasswordChange} 
          placeholder="confirm password..." 
          type="password" 
        />  
      </View>
      <View style={styles.actionsSection}>
        <View>
          {FormAlert.message ? (
              <Typography variant="body" style={[styles.formAlertMsg, alertMsgColor]}>
                {FormAlert.message}
              </Typography>
            ) : null}
          <Button isLoading={isValidating || registerMutation.isPending} label="Sign Up" onPress={onSignupPress} />
        </View>
        <View style={styles.linkRow}>
          <Typography variant="caption">You already have an account?</Typography>
          <Button 
            onPress={onLoginPress}
            label="Login"  
            backgroundColor="transparent" 
            style={styles.linkButton}
            textVariant="caption"
            textColor="#363F47"
          />
        </View>
      </View>
    </View>
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 28,
    backgroundColor: "#E6EBF0",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: "18%"
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
