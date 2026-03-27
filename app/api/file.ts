import { CheckAccountPayload, CheckAccountResponse } from "./auth";
import { apiFetch } from "./client";

export interface UploadPresignedUrlResponse {
	presignedUrl:string,
	expiresIn:  number,
	fileId:     string
}

export interface UploadPresignedUrlRequest{
	fileName:    string
	sizeInBytes:   number
	contentType: string
	fileType:    string
}

export const uploadPresignedFile = (payload: UploadPresignedUrlRequest) =>
  apiFetch<UploadPresignedUrlResponse>('/files/presign-upload', { method: 'POST', body: payload, auth: false });