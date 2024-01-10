import {SetMetadata} from '@nestjs/common';

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata('public', IS_PUBLIC_KEY);
