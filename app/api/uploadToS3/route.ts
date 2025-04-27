import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, ExpirationStatus } from "@aws-sdk/client-s3";


const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string
    }
});


async function uploadFileToS3 (file:any, name:any) {

    const fileBuffer = file;

    try{
        if(file){
        
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `raffles/${name}`,
                Body: fileBuffer,
                ContentType: "image/png",
                Expires: new Date(Date.now() + 60 * 60 * 24 * 90 * 1000), 
            }
            const command = new PutObjectCommand(params);
            await s3Client.send(command);
        }

        return true;
    }
    catch(e){
        console.error("This is error: ", e);
        return false
    }
    
}

export async function POST(request:any){
    try{

        const formData = await request.formData();
        const profileImage = formData.get('profileImage');

        const ca = formData.get('ca');
        const tokenId = formData.get('tokenId');
        
        if(!ca || !tokenId){
            return NextResponse.json({error: "Required fields"}, {status: 400})
        }
        
        if(profileImage){
            const buffer = Buffer.from(await profileImage.arrayBuffer());
            const status = await uploadFileToS3(buffer, `${ca}-${tokenId}`);
            if(!status){
                return NextResponse.json({error: "Error Uploading File"}, {status: 500})
            }
            return NextResponse.json({success: "File Uploaded Successfully"}, {status: 200});
        }

    }
    catch(err){
        return NextResponse.json({error: "Error Uploading File"}, {status: 500})
    }
}



