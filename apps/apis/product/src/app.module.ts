import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {configurationService} from "./configuration/configuration.service";
import {ProductModule} from "./product/product.module";
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configurationService.getTypeOrmConfiguration()),
    ConfigModule.forRoot({isGlobal: true, envFilePath: `${__dirname}../../.env`}),
    ProductModule,
    AuthModule,
    UserModule
  ],
})
export class AppModule {
}
