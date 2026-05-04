/// <reference types="node" />
/// <reference types="node" />
import { S3 } from 'aws-sdk';
export declare class FileService {
    s3: S3;
    uploadToS3(buffer: Buffer, filename: string): Promise<S3.ManagedUpload.SendData>;
    upload(buffer: Buffer, filename: string): Promise<string>;
    remove(key: string): Promise<import("aws-sdk/lib/request").PromiseResult<S3.DeleteObjectOutput, import("aws-sdk").AWSError>>;
}
