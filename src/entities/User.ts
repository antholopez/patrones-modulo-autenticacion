import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('User')
export class User {
  
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  idRole: number;

  @Column()
  accessToken: string;
}