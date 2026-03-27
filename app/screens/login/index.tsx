import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomTextInput from "@components/CustomTextInput";
import Button from "app/components/Button";
import React, { useCallback, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { AuthParamList, AuthRoutes } from "../../nagivations/AuthNavigation";
import Typography from "app/components/Typography";
import { useValidation } from "app/validations/index";
import { LoginSchema } from "app/validations/auth";
import { ApiError } from "app/api/client";
import { useLoginMutation } from "app/hooks/useAuthApi";

const initialFormState = {
  username: "",
  password: ""
};
const initialErrorState = {
  ...initialFormState,
  form: "",
};

const LoginScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthParamList>>();
  const { validate, isLoading: isValidating } = useValidation();
  const loginMutation = useLoginMutation();

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);

  const handleEmailChange = useCallback(
    (value: string) => setForm(prev => ({ ...prev, username: value })),
    []
  );

  const handlePasswordChange = useCallback(
    (value: string) => setForm(prev => ({ ...prev, password: value })),
    []
  );

  const onSignupPress = useCallback(() => {
    navigate(AuthRoutes.Registration);
  }, [navigate]);

  const validateFormData = useCallback(async () => {
    setErrors(initialErrorState);
    const validationResult = await validate(LoginSchema, form);
    console.log({validationResult})
    if (validationResult) {
      setErrors(prev => ({ ...prev, ...validationResult }));
      return false;
    }
    return true;
  }, [form, validate]);

  const onLoginPress = useCallback(async () => {
    const isValid = await validateFormData();
    if (!isValid) return;
    loginMutation.mutate(form, {
      onError: error => {
        console.log({error})
        const errMsg =
          error instanceof ApiError
            ? error.message
            : "Opps something went wrong";
        setErrors(prev => ({ ...prev, form: errMsg }));
      },
    });
  }, [form, loginMutation, validateFormData]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerSection}>
        <Typography variant="display">Welcome Back</Typography>
        <Typography variant="label">Hey! Good to see you again</Typography>
      </View>

      <View style={styles.formSection}>
        <CustomTextInput
          error={errors.username}
          leftIcon={{ name: "person", size: 28 }}
          value={form.username}
          onChangeText={handleEmailChange}
          placeholder="username..."
        />
        <CustomTextInput
          error={errors.password}
          leftIcon={{ name: "key", size: 28 }}
          value={form.password}
          onChangeText={handlePasswordChange}
          placeholder="password..."
          type="password"
        />
      </View>

      <View style={styles.actionsSection}>
        <View>
          {errors.form ? (
              <Typography variant="body" style={styles.formErrorMsg}>
                {errors.form}
              </Typography>
            ) : null}
          <Button
            isLoading={isValidating || loginMutation.isPending}
            label="Login"
            onPress={onLoginPress}
          />
        </View>
        <View style={styles.linkRow}>
          <Typography variant="caption">Don't have an account?</Typography>
          <Button
            onPress={onSignupPress}
            label="Sign up"
            backgroundColor="transparent"
            style={styles.linkButton}
            textVariant="caption"
            textColor="#363F47"
          />
        </View>
      </View>
    </View>
  );
};

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
  formSection: {
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
  formErrorMsg: { 
    color: "#DC2626", 
    textAlign: "center", 
    paddingBottom: 8 
  }
})

export default LoginScreen;
