import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity("tbl_product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
    length: 100
  })
  name: string;

  @Column({
    default: 0.0,
    type: "float"
  })
  price: number;

  @Column({
    default: 0
  })
  quantity: number;

  @Column({type: "timestamptz", nullable: true})
  createdAt: Date;

  @Column({type: "timestamptz", nullable: true})
  updatedAt: Date;

  @Index()
  @Column({type: "timestamptz", nullable: true})
  deletedAt: Date;

}
