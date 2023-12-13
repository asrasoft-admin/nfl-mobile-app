import RNFetchBlob from 'react-native-fetch-blob';
import AWS from 'aws-sdk';
import {Buffer} from 'buffer';

import config from '../../config';

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
    Bucket: config.S3_URL.PROD_S3_BUCKET,
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
