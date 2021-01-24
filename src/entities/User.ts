import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity('User')
export class User {
  
  @PrimaryColumn()
  idUser: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;
}