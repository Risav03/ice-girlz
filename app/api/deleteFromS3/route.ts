import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server.js";

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string
    }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {key} = body;

    const data = await s3Client.send(new DeleteObjectCommand({Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key}));

    return NextResponse.json({message: "yay"},{status:200}); // For unit tests.
  } catch (err) {
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
  }
};

