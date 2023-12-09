import RNFetchBlob from 'react-native-fetch-blob';
import AWS from 'aws-sdk';
import {Buffer} from 'buffer';
import {
  STAGE_CLOUDINARY_URL,
  STAGE_CLOUDINARY_DATA_STR,
  PROD_S3_REGION,
  PROD_S3_ACCESS_KEY_ID,
  PROD_S3_SECRET_ACCESS_KEY,
  PROD_S3_BUCKET,
} from '@env';

import config from '../../config';

// This is for stagging -----
// const uploadAudioToCloudinary = async audioPath => {
//   // stage --
//   const url = config.cloudinaryURL.STAGE_CLOUDINARY_URL;

//   const generatedFilename = audioPath.substring(audioPath.lastIndexOf('/') + 1);

//   const uploadData = [
//     {
//       name: 'file',
//       filename: generatedFilename,
//       type: 'audio/aac',
//       data: RNFetchBlob.wrap(audioPath),
//     },
//     // stage --
//     {
//       name: 'upload_preset',
//       data: config.cloudinaryURL.STAGE_CLOUDINARY_DATA_STR,
//     },
//   ];

//   console.log({uploadData});
//   try {
//     const response = await RNFetchBlob.fetch(
//       'POST',
//       url,
//       {
//         'Content-Type': 'multipart/form-data',
//       },
//       uploadData.map(field => ({
//         name: field.name,
//         filename: field.filename,
//         type: field.type,
//         data: field.data,
//       })),
//     );

//     const responseJson = await response.json();
//     const downloadLink = responseJson.secure_url;
//     return downloadLink;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export default uploadAudioToCloudinary;

// cloudinary.config({
//   cloud_name: 'dwhyqylgz',
//   api_key: '566327318464425',

//   api_secret: 'DmPiE1xCKoMjPg3QeQiFv1VTAMk',
// });

// This is for production -----
const uploadAudioToS3 = async audioPath => {
  // Set up AWS configuration
  AWS.config.update({
    region: config.S3_URL.PROD_S3_REGION, // e.g., 'us-east-1'
    accessKeyId: config.S3_URL.PROD_S3_ACCESS_KEY_ID,
    secretAccessKey: config.S3_URL.PROD_S3_SECRET_ACCESS_KEY,
    correctClockSkew: true,
  });

  const s3 = new AWS.S3();

  // Generate a unique filename (you can modify this logic)
  const generatedFilename = audioPath.substring(audioPath.lastIndexOf('/') + 1);

  // Read the audio file as a Buffer
  const fileContent = await RNFetchBlob.fs.readFile(audioPath, 'base64');
  const fileBuffer = Buffer.from(fileContent, 'base64');

  // S3 Upload parameters
  const params = {
    Bucket: PROD_S3_BUCKET,
    Key: `uploads/${generatedFilename}`,
    Body: fileBuffer,
    ContentType: 'audio/aac', // Adjust based on your actual audio file type
  };

  try {
    // Upload to S3
    const response = await s3.upload(params).promise();

    const publicUrl = response.Location;
    console.log('Successfully uploaded to S3:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload to S3');
  }
};

export default uploadAudioToS3;
