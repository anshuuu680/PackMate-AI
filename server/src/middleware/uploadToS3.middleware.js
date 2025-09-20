import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = (folder = "uploads") => {
  return async (req, res, next) => {
    try {
      if (!req.file) return next(); // No file, continue

      const file = req.file;
      const fileExtension = file.originalname.split(".").pop();
      const key = `${folder}/${uuidv4()}.${fileExtension}`;

      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      });

      await s3.send(command);

      req.file.s3Key = key; // Save S3 key for later use
      req.file.s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;

      next();
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).json({ message: "Failed to upload file to S3" });
    }
  };
};
