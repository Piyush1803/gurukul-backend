import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    try {
      cloudinary.config({
        cloud_name: 'dxbhigrlq',
        api_key: '914212172749795',
        api_secret: 'DeagupkZ-3KwJyXHRUmSROuwjy8',
        secure: true,
      });
      return cloudinary;
    } catch (error) {
      console.error('Failed to configure Cloudinary:', error);
      throw new Error('Cloudinary configuration failed');
    }
  },
  inject: [ConfigService],
};
