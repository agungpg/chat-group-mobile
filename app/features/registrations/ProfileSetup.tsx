import React, { useCallback, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import CustomTextInput from "@components/CustomTextInput";
import Button from "@components/Button";
import Typography from "@components/Typography";
import { useValidation } from "app/validations/index";
import { SignUpSchema } from "app/validations/auth";
import { ApiError } from "app/api/client";
import { useRegisterMutation } from "app/hooks/useAuthApi";
import useRegistration from "./hooks/useRegistration";
import * as ImagePicker from 'react-native-image-picker';
import { useUploadImage } from "app/hooks/useUploadImage";
import Avatar from "@components/Avatar";
import AvatarForm from "./AvatarForm";
const formInitialState = {
  name: "",
  bio: "",
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
    const {onPrevStep} = useRegistration()
    const { upload, isPending } = useUploadImage();
    const { validate, isLoading: isValidating } = useValidation();
    const registerMutation = useRegisterMutation();

    const [form, setForm] = useState(formInitialState);
    const [asset, setAsset] = useState<ImagePicker.Asset | null>(null)
    const [errors, setErrors] = useState(errorInitialState);
    const [FormAlert, setFormAlert] = useState<FormAlert>({
      type: null,
      message: null
    })

    const handleNameChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, name: value })),
      []
    );

    const handleBioChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, bio: value })),
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

      // registerMutation.mutate(
      //   {
      //     name: form.name,
      //     email: form.email,
      //     password: form.password,
      //   },
      //   {
      //     onSuccess: () => {
      //       setFormAlert({
      //         type: "success",
      //         message: "Signup successful. You can login now.",
      //       });
      //       setForm(formInitialState);
      //     },
      //     onError: (error) => {
      //       const errMsg =
      //         error instanceof ApiError
      //           ? error.message
      //           : "Opps something went wrong";
      //       setFormAlert({
      //         type: "error",
      //         message: errMsg,
      //       });
      //     },
      //   }
      // );
    }, [validateFormData]);

    const onUploadProfilePicture = useCallback(() => {
      ImagePicker.launchImageLibrary(
        {
          selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: true,
        },
        async (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            setFormAlert({
              type: "error",
              message: response.errorMessage || "Image picker failed.",
            });
          } else if (response.assets && response.assets.length > 0) {
            const selectedImage = response.assets[0];
            if (!selectedImage.uri) {
              setFormAlert({
                type: "error",
                message: "Selected image has no valid URI.",
              });
              return;
            }
            setAsset(selectedImage)
            try {
              await upload(selectedImage);
              setFormAlert({
                type: "success",
                message: "Profile image uploaded successfully.",
              });
            } catch (err) {
              const errMsg =
                err instanceof ApiError
                  ? err.message
                  : err instanceof Error
                    ? err.message
                    : "Failed to upload image.";
              setFormAlert({
                type: "error",
                message: errMsg,
              });
            }
          }
        }
      );
    }, [upload]);

    const alertMsgColor = { color: FormAlert.type === "success" ? "#22C55E" : "#DC2626" }
    console.log({asset})
    
    return <ScrollView style={styles.screenContainer}>
      <View style={{gap: 40}}>
      <Button withIcon={{
        name: "arrow-back",
        color: "#4B5563",
        size: 28,
        position: 'left'
      }}
      isLoading={isValidating || registerMutation.isPending} 
      style={styles.previousBtn} 
      onPress={onPrevStep} />

      <View style={styles.headerSection}>
        <Typography variant="heading">Personal Info</Typography>
      </View>
      <View style={styles.formInputSection}>
        <AvatarForm uri={asset?.uri || ""} isLoading={isPending} onUpload={onUploadProfilePicture} />
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
          leftIcon={{
            name: "comment",
            size: 28
          }}
          error={errors.bio}
          value={form.bio} 
          onChangeText={handleBioChange} 
          placeholder="bio..." 
          multiline={true}
          style={{
            height: 150,
            borderRadius: 12,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingVertical: 0,
            textAlignVertical: "top"
          }}
          wrapperStyle={{
            paddingVertical: 12
          }}
          numberOfLines={5}
        />  
      </View>
      </View>
      <View style={styles.actionsSection}>
        <View>
          {FormAlert.message ? (
              <Typography variant="body" style={[styles.formAlertMsg, alertMsgColor]}>
                {FormAlert.message}
              </Typography>
            ) : null}
          <Button isLoading={isValidating || registerMutation.isPending} label="Next" onPress={onSignupPress} />
        </View>
      </View>
    </ScrollView>
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 28,
    backgroundColor: "#E6EBF0",
    flex: 1,
  },
  headerSection: {
    gap: 12
  },
  formInputSection: {
    gap: 20
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
  },
  previousBtn: { width: 42, height: 42, padding: 0, backgroundColor: "#F3F4F6", borderColor: "#D1D5DB", paddingHorizontal: 0 }
})

export default Account;
