const aws = require('aws-sdk');

require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const obterClienteS3 = () => {
  const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);
  return new aws.S3({
    endpoint,
    credentials: {
      accessKeyId: process.env.KEY_ID,
      secretAccessKey: process.env.APP_KEY,
    },
  });
};

const uploadImagem = async (path, buffer, mimetype) => {
  const s3 = obterClienteS3();
  const caminhoArquivo = `produtos/${Date.now()}-${path}`;

  const imagem = await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: caminhoArquivo,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    path: imagem.Key,
    url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_S3}/${imagem.Key}`,
  };
};

const deletarImagem = async (url) => {
  if (!url) return;

  const prefixoBucket = `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_S3}/`;
  const path = url.startsWith(prefixoBucket)
    ? url.replace(prefixoBucket, '')
    : url;

  const s3 = obterClienteS3();
  await s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: path,
    })
    .promise();
};

module.exports = { uploadImagem, deletarImagem };
