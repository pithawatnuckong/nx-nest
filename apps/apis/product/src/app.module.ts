import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {configurationService} from "./configuration/configuration.service";
import {ProductModule} from "./product/product.module";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: "../../../../.env"}),
    TypeOrmModule.forRoot(configurationService.getTypeOrmConfiguration()),
    ProductModule,
    AuthModule,
    UserModule
  ],
})
export class AppModule {
}
