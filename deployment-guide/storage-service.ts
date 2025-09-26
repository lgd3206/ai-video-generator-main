// 云存储服务配置
// lib/storage.ts

import AWS from 'aws-sdk'
import { v2 as cloudinary } from 'cloudinary'

// AWS S3配置
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
})

// Cloudinary配置
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export interface UploadResult {
  url: string
  publicId: string
  format: string
  size: number
}

export class StorageService {
  // 上传视频到S3
  async uploadVideoToS3(
    buffer: Buffer,
    filename: string,
    contentType: string
  ): Promise<UploadResult> {
    const key = `videos/${Date.now()}-${filename}`

    const params = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: 'public-read'
    }

    const result = await s3.upload(params).promise()

    return {
      url: result.Location,
      publicId: key,
      format: contentType.split('/')[1],
      size: buffer.length
    }
  }

  // 上传到Cloudinary（视频处理更好）
  async uploadVideoToCloudinary(
    buffer: Buffer,
    filename: string
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'ai-videos',
          public_id: `${Date.now()}-${filename.split('.')[0]}`,
          eager: [
            { quality: 'auto', format: 'mp4' },
            { quality: 'auto:low', format: 'webm' }
          ]
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve({
              url: result!.secure_url,
              publicId: result!.public_id,
              format: result!.format,
              size: result!.bytes
            })
          }
        }
      ).end(buffer)
    })
  }

  // 生成预签名URL（用于直接上传）
  async generatePresignedUrl(filename: string, contentType: string): Promise<string> {
    const key = `uploads/${Date.now()}-${filename}`

    const params = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Expires: 300, // 5分钟过期
      ContentType: contentType,
      ACL: 'public-read'
    }

    return s3.getSignedUrl('putObject', params)
  }

  // 删除文件
  async deleteFile(publicId: string, isCloudinary: boolean = true): Promise<boolean> {
    try {
      if (isCloudinary) {
        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' })
      } else {
        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: publicId
        }).promise()
      }
      return true
    } catch (error) {
      console.error('Delete file error:', error)
      return false
    }
  }
}

// 环境变量配置示例
const envConfig = `
# AWS S3配置
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-video-bucket

# Cloudinary配置（推荐用于视频）
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 或者使用Vercel Blob（简单方案）
BLOB_READ_WRITE_TOKEN=vercel_blob_token
`