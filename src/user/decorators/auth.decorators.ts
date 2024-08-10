import { SetMetadata } from '@nestjs/common';
import {
  IS_ADMIN_KEY,
  IS_PUBLIC_KEY,
  IS_REFRESH_TOKEN,
} from '../constants/auth.contant';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Admin = () => SetMetadata(IS_ADMIN_KEY, true);
export const RefreshToken = () => SetMetadata(IS_REFRESH_TOKEN, true);
