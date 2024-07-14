import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class BaseController {}
