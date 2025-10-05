import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private cloudinaryInstance: typeof cloudinary) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new BadRequestException('No file provided or file buffer is empty');
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('File size exceeds 10MB limit');
    }

    // Validate file type
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    try {
      // Use signed upload with API credentials
      const result = await this.cloudinaryInstance.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        {
          folder: 'gurukul_images',
          use_filename: true,
          unique_filename: true,
          resource_type: 'auto',
        }
      );

      if (result && result.secure_url) {
        return result.secure_url;
      } else {
        throw new BadRequestException('Upload failed: No result returned');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new BadRequestException(`Upload failed: ${error.message}`);
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    if (!publicId) {
      throw new BadRequestException('Public ID is required for deletion');
    }

    return new Promise((resolve, reject) => {
      try {
        this.cloudinaryInstance.uploader.destroy(publicId, (error, result) => {
          if (error) {
            console.error('Cloudinary delete error:', error);
            reject(new BadRequestException(`Delete failed: ${error.message}`));
          } else {
            resolve();
          }
        });
      } catch (error) {
        console.error('Delete stream error:', error);
        reject(new BadRequestException('Failed to delete image'));
      }
    });
  }

  extractPublicId(url: string): string {
    if (!url) return '';
    
    try {
      const matches = url.match(/\/v\d+\/(.+)\./);
      return matches ? matches[1] : '';
    } catch (error) {
      console.error('Error extracting public ID:', error);
      return '';
    }
  }
}
