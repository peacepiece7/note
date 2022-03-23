const AWS = require('aws-sdk');
const sharp = require('sharp');
// 람다가 실행될 떄 알아서 access key를 가져오기 떄문에 따로 설정이 필요없음
// aws lambda안에 해당 파일을 압축해서 올림 -> s3에 업로드할 떄 aws에서 s3의 config를 그대로 가져옴
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // react-nodebird-s3
  // url 한글 들어가 있는 경우 해결
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // original/12312312_abc.png
  console.log(Bucket, Key);
  const filename = Key.split('/')[Key.split('/').length - 1];
  // 확장자를 소문자로 변경
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase();
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
  console.log('filename', filename, 'ext', ext);

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log('original', s3Object.Body.length);
    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, { fit: 'inside' })
      .toFormat(requiredFormat)
      .toBuffer();
    await s3
      .putObject({
        Bucket,
        Key: `thumb/${filename}`,
        Body: resizedImage,
      })
      .promise();
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
