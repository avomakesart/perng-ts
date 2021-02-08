import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Users {
  @Field()
  @PrimaryKey()
  id: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
 
  @Field()
  @Property({ type: 'text' })
  firstName!: string;

  @Field()
  @Property({ type: 'text' })
  lastName!: string;

  @Field()
  @Property({ type: 'text', unique: true })
  email!: string;

  @Field()
  @Property({ type: 'text', unique: true })
  username!: string;

  @Property({ type: 'text' })
  password!: string;
}
