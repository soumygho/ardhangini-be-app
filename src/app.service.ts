import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInformation(): string {
    return `<p>Swagger documentation available at <b>http://host-ip:${process.env.PORT}/swagger </b> <hr/> Swagger json available at <b>http://host-ip:${process.env.PORT}/swagger-json</b><hr/> Yaml available on <b>http://host-ip:${process.env.PORT}/swagger-yaml</b><hr/></p>`;
  }
}
