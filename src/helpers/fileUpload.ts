import {
  cloudServerActions,
  cloudServerName,
  imagesCloudServerUrl,
  imagesCloudServerPreset,
} from '@/shared/constants';

export const fileUpload = async (file: File): Promise<string> => {
  // https://api.cloudinary.com/v1_1/:CLOUD-NAME/:ACTION
  const cloudServerUrl = `${imagesCloudServerUrl}/${cloudServerName}/${cloudServerActions.upload}`;

  const formData = new FormData();
  formData.append('upload_preset', imagesCloudServerPreset);
  formData.append('file', file);

  try {
    const resp = await fetch(cloudServerUrl, {
      method: 'POST',
      body: formData,
    });
    if (resp.ok) {
      const cloudResp = (await resp.json()) as { secure_url: string; };
      return cloudResp.secure_url;
    }
    throw await resp.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
