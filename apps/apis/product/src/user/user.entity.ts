import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from "bcrypt"
import {IsEmail} from "class-validator";

@Entity("tbl_user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
    length: 60
  })
  username: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    length: 200
  })
  password: string;

  @Column({
    type: "timestamptz"
  })
  createdAt: Date;

  @Column({
    type: "timestamptz",
    nullable: true
  })
  updatedAt: Date;

  @Index()
  @Column({
    type: "timestamptz",
    nullable: true
  })
  deletedAt: Date;


  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }

  @BeforeInsert()
  private beforeInsert() {
    this.createdAt = new Date()
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = new Date()
  }
}
