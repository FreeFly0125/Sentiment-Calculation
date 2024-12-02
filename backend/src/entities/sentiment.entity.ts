/** @format */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity({ name: "sentiment" })
export class SentimentEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar" })
  user: string;

  @Column({ type: "varchar" })
  feedback: string;

  @Column({ type: "varchar" })
  sentimentLabel: string;
}
