import RNFetchBlob from 'react-native-fetch-blob';

const uploadAudioToCloudinary = async audioPath => {
  // stage --
  const url = `https://api.cloudinary.com/v1_1/dwhyqylgz/video/upload`;

  // prod --
  // const url = `https://api.cloudinary.com/v1_1/degnxdivg/video/upload`;

  const generatedFilename = audioPath.substring(audioPath.lastIndexOf('/') + 1);

  const uploadData = [
    {
      name: 'file',
      filename: generatedFilename,
      type: 'audio/aac',
      data: RNFetchBlob.wrap(audioPath),
    },
    // stage --
    {name: 'upload_preset', data: 'v8rutycs'},

    // prod --
    // {name: 'upload_preset', data: 'xzoqxjtz'},
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

// cloudinary.config({
//   cloud_name: 'dwhyqylgz',
//   api_key: '566327318464425',

//   api_secret: 'DmPiE1xCKoMjPg3QeQiFv1VTAMk',
// });

// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { encode } from 'base-64';
// import { readFile } from 'react-native-fs';

// const uploadAudioToS3 = async (audioPath) => {
//   const s3Config = {
//     region: 'your-s3-region', // e.g., 'us-east-1'
//     accessKeyId: 'your-access-key',
//     secretAccessKey: 'your-secret-key',
//     bucket: 'your-s3-bucket-name',
//   };

//   const file = {
//     uri: file://${audioPath},
//     name: 'audio.mp3',
//     type: 'audio/mp3',
//   };

//   try {
//     const fileContent = await readFile(file.uri, 'base64');
//     const base64Content = encode(fileContent);

//     const s3Client = new S3Client({
//       region: s3Config.region,
//       credentials: {
//         accessKeyId: s3Config.accessKeyId,
//         secretAccessKey: s3Config.secretAccessKey,
//       },
//     });

//     const command = new PutObjectCommand({
//       Bucket: s3Config.bucket,
//       Key: uploads/${file.name},
//       Body: Buffer.from(base64Content, 'base64'),
//       ContentType: file.type,
//     });

//     const response = await s3Client.send(command);

//     if (response.$metadata.httpStatusCode === 200) {
//       console.log('Successfully uploaded to S3:', response.Location);
//       return response.Location;
//     } else {
//       console.log('Failed to upload to S3:', response);
//       throw new Error('Failed to upload to S3');
//     }
//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     throw error;
//   }
// };

// export default uploadAudioToS3;
