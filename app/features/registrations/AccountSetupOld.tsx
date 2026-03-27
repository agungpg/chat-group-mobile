import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomTextInput from "@components/CustomTextInput";
import Button from "@components/Button";
import Typography from "@components/Typography";
import { AuthParamList, AuthRoutes } from "app/nagivations/AuthNavigation";
import { useValidation } from "app/validations/index";
import { SignUpSchema } from "app/validations/auth";
import { ApiError } from "app/api/client";
import { useCheckAccountMutation, useRegisterMutation } from "app/hooks/useAuthApi";
import useRegistration from "./hooks/useRegistration";
const formInitialState = {
  username: "",
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

const Account = () => {
    const { setAccountData, data } = useRegistration()
    const { navigate } = useNavigation<NativeStackNavigationProp<AuthParamList>>();
    const {mutateAsync: checkAccount, isPending: isCheckingAccount} = useCheckAccountMutation()
    const { validate, isLoading: isValidating } = useValidation();
    const registerMutation = useRegisterMutation();

    const [form, setForm] = useState(formInitialState);
    const [errors, setErrors] = useState(errorInitialState);
    const [FormAlert, setFormAlert] = useState<FormAlert>({
      type: null,
      message: null
    })
    useEffect(() => {
      if(data.email && data.username && data.password) {
        setForm({
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.password
        })
      }
    }, [data.email, data.password, data.username])

    const handleusernameChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, username: value })),
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
      try {
        const resp = await checkAccount({
          username: form.username,
          email: form.email
        });

        const err = {} as any;
        if(resp.data.isEmailTaken) {
          err.email = "Email is already taken!"
        }
        if(resp.data.isUsernameTaken) {
          err.username = "Username is already taken!"
        }
        
        if(Object.keys(err).length>0) {
          setErrors(prev => ({
            ...prev,
            ...err
          }));
          return false;
        }

        return true;
      } catch (error) {
        const defaultMessage = "Unable to check account right now. Please try again.";
        const isTimeoutError =
          error instanceof Error && /network request timed out/i.test(error.message);
        const isNetworkError =
          error instanceof Error && /network request failed/i.test(error.message);

        const message = error instanceof ApiError
          ? error.message
          : (isTimeoutError || isNetworkError)
            ? "Cannot reach the API server. Verify backend is running and API host is reachable."
            : defaultMessage;

        setFormAlert({
          type: "error",
          message,
        });
        return false;
      }
    }, [checkAccount, form, validate]);

    const onNextPress = useCallback(async () => {
      const isValid = await validateFormData();
      console.log({ isValid })
      if (!isValid) return;
      console.log("Account data is valid. Proceeding to next step...");
      setAccountData({
        username: form.username,
        email: form.email,
        password: form.password
      }, 1)
    }, [form, setAccountData, validateFormData]);

    const onLoginPress = useCallback(() => navigate(AuthRoutes.Login), [navigate]);

    const alertMsgColor = { color: FormAlert.type === "success" ? "#22C55E" : "#DC2626" }

    
    return <View style={styles.screenContainer}>
      <View style={styles.headerSection}>
        <Typography variant="display">Sign Up</Typography>
        <Typography variant="label">Hello! let's join with us</Typography>
      </View>
      <View style={styles.formInputSection}>
        <CustomTextInput 
          error={errors.username}
          leftIcon={{
            name: "person",
            size: 28,
          }}
          value={form.username} 
          onChangeText={handleusernameChange} 
          placeholder="username..." 
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
          <Button isLoading={isValidating || isCheckingAccount || registerMutation.isPending} label="Next" onPress={onNextPress} />
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

export default Account;
