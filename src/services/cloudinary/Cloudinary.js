import RNFetchBlob from 'react-native-fetch-blob';

const uploadAudioToCloudinary = async audioPath => {
  const url = `https://api.cloudinary.com/v1_1/dwhyqylgz/video/upload`;

  const uploadData = [
    {
      name: 'file',
      filename: 'audio.mp3',
      type: 'audio/mp3',
      data: RNFetchBlob.wrap(audioPath),
    },
    {name: 'upload_preset', data: 'v8rutycs'}, // Replace with your Cloudinary upload preset
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
    console.log({response});
    const downloadLink = responseJson.secure_url;
    return downloadLink;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default uploadAudioToCloudinary;
