import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "react-native-image-picker";
import { uploadPresignedFile, UploadPresignedUrlRequest, UploadPresignedUrlResponse } from "app/api/file";

export const useUploadImage = () => {
  const { mutateAsync, isPending, isError, error, data } = useMutation<
    UploadPresignedUrlResponse,
    Error,
    ImagePicker.Asset
  >({
    mutationFn: async (asset) => {
      if (!asset.uri) {
        throw new Error("Selected image URI is missing.");
      }
      console.log({uri: asset.uri})
      const localFileResponse = await fetch(asset.uri);
      if (!localFileResponse.ok) {
        throw new Error("Unable to read the selected image from device storage.");
      }
      
      console.log(localFileResponse)
      const fileBlob = await localFileResponse.blob();
      console.log({fileBlob})
      const contentType = asset.type || fileBlob.type || "application/octet-stream";
      const fallbackExtension = contentType.split("/")[1] || "bin";
      const fileNameFromUri = asset.uri.split("/").pop()?.split("?")[0];

      const presignPayload: UploadPresignedUrlRequest = {
        fileName: asset.fileName || fileNameFromUri || `avatar-${Date.now()}.${fallbackExtension}`,
        sizeInBytes: asset.fileSize || fileBlob.size,
        contentType,
        fileType: "avatar"
      };
      const presigned = await uploadPresignedFile(presignPayload);
      console.log({presigned})
      const uploadResponse = await fetch(presigned.presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: fileBlob,
      });

      if (!uploadResponse.ok) {
        throw new Error(`S3 upload failed with status ${uploadResponse.status}.`);
      }

      return presigned;
    },
  });

  const onUploadImage = async (asset: ImagePicker.Asset) => {
    console.log("onUploadImage: ", asset)
    try {
      const response = await mutateAsync(asset);
      return response;
    } catch (error) {
    console.error("error: ", error)
      
    }
  };

  return {
    upload: onUploadImage,
    isPending,
    isError,
    error,
    data,
  };
};
