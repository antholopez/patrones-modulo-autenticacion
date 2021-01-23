import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity('Role')
export class Role {
  
  @PrimaryColumn()
  idRole: number;

  @Column()
  description: string;
}