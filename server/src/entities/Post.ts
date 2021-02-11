import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Users } from './User';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;
  
  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ type: 'int', default: 0 })
  points!: number;

  @Field()
  @Column()
  creatorId: number;

  @ManyToOne(() => Users, user => user.posts)
  creator: Users;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
