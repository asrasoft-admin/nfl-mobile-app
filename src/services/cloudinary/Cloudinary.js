import RNFetchBlob from 'react-native-fetch-blob';

import config from '../../config';

// This is for stagging -----
const uploadAudioToCloudinary = async audioPath => {
  // stage --
  const url = config.cloudinaryURL.STAGE_CLOUDINARY_URL;

  const generatedFilename = audioPath.substring(audioPath.lastIndexOf('/') + 1);

  const uploadData = [
    {
      name: 'file',
      filename: generatedFilename,
      type: 'audio/aac',
      data: RNFetchBlob.wrap(audioPath),
    },
    // stage --
    {
      name: 'upload_preset',
      data: config.cloudinaryURL.STAGE_CLOUDINARY_DATA_STR,
    },
  ];

  console.log({uploadData});
  try {
    const response = await RNFetchBlob.fetch(
      'POST',
      url,
      {
        'Content-Type': 'multipart/form-data',
      },
      uploadData.map(field => ({
        name: field.name,
        filename: field.filename,
        type: field.type,
        data: field.data,
      })),
    );

    const responseJson = await response.json();
    const downloadLink = responseJson.secure_url;
    return downloadLink;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default uploadAudioToCloudinary;
