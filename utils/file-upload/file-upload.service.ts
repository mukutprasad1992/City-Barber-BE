import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import { first } from 'rxjs';

@Injectable()
export class FileUploadService {
    AWS_S3_BUCKET = 'citybarberappbucket';
    s3 = new AWS.S3({
        accessKeyId: 'AKIAWKAYYN64WDL2HL4P',
        secretAccessKey: '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',
    });
    async uploadFile(files: any) {
        console.info("files =>", files)
        const uploadedFiles = [];
        for (const file of files.documents) {
            const generateImageName = `image_${Date.now().toString()}${path.extname(file.originalname)}`;
            const s3Response = await this.s3_upload(
                file.buffer,
                this.AWS_S3_BUCKET,
                generateImageName,
                file.mimetype,
            );

            uploadedFiles.push(s3Response.Location);
        }
        return uploadedFiles;
    }
    async s3_upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ContentType: mimetype
        };

        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }
}
