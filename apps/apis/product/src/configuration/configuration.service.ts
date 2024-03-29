import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Product} from "../product/product.entity";
import {User} from "../user/user.entity";

class ConfigurationService {
  constructor(private env: { [key: string]: string | undefined }) {
  }

  private getValue(key: string, throwOnMissing: boolean = true): string {
    const value: string = this.env[key]
    if (!value && throwOnMissing) {
      throw new Error(`[configuration.service.ts] - ERR - missing key: ${key}`)
    }
    return value
  }

  getTypeOrmConfiguration(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      // entities: [__dirname + "**/*.entity{.ts,.js}"],
      entities: [Product, User],
      host: this.getValue("DATASOURCE_HOST"),
      port: parseInt(this.getValue("DATASOURCE_PORT")),
      username: this.getValue("DATASOURCE_USER"),
      password: this.getValue("DATASOURCE_PWD"),
      database: this.getValue("DATASOURCE_NAME"),
      logger: "debug",
      ssl: false,
      // synchronize: this.getValue("DATASOURCE_SYNCHRONIZE").toLowerCase() === "true"
      synchronize: true,

    };
  }

  getJwtSecretKey(): string {
    return this.getValue("JWT_SECRET", false) || "jwtSecret";
  }

  getApplicationPort(): number {
    return parseInt(this.getValue("APPLICATION_PORT", false)) || 0
  }
}


const configurationService: ConfigurationService = new ConfigurationService(process.env)

export {configurationService}
