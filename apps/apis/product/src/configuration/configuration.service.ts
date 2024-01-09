import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";

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

  public getTypeOrmConfiguration(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.getValue("DATASOURCE_HOST"),
      port: parseInt(this.getValue("DATASOURCE_PORT")),
      username: this.getValue("DATASOURCE_USER"),
      password: this.getValue("DATASOURCE_PWD"),
      database: this.getValue("DATASOURCE_NAME"),
      logger: "file",
      entities: ['**/*.entity{.ts,.js}'],
      ssl: false,
      // autoLoadEntities: true
      synchronize: this.getValue("DATASOURCE_SYNCHRONIZE").toLowerCase() === "true"
    };
  }
}


const configurationService: ConfigurationService = new ConfigurationService(process.env)

export {configurationService}
