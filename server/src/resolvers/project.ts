import { Project } from '../entities/Project';
import {
  Arg,
  Field,
  Int,
  Mutation,
  InputType,
  Query,
  Resolver,
} from 'type-graphql';

@InputType()
class ProjectData {
  @Field()
  title: string;
  @Field()
  featureImage: string;
  @Field()
  content: string;
  @Field()
  tags: string;
}

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    return Project.find();
  }

  @Query(() => Project, { nullable: true })
  project(@Arg('id', () => Int) id: number): Promise<Project | undefined> {
    return Project.findOne(id);
  }

  @Mutation(() => Project)
  async createProject(
    @Arg('projectData') projectData: ProjectData
  ): Promise<Project> {
    return Project.create({
      title: projectData.title,
      featureImage: projectData.featureImage,
      content: projectData.content,
      tags: projectData.tags,
    }).save();
  }

  //   @Mutation(() => Project, { nullable: true })
  //   async updatePost(
  //     @Arg('id') id: number,
  //     @Arg('projectData', () => String, { nullable: true }) projectData: ProjectData): Promise<Project | null> {
  //     const project = await Project.findOne(id);
  //     if (!project) return null;
  //     if (typeof tit !== undefined) {
  // projectData.title = title,
  // projectData.featureImage = featureImage,
  // projectData.content =,
  //  projectData.tags
  //       await Project.update({id}, {title})
  //     }

  //     return project;
  //   }

  @Mutation(() => Boolean)
  async deleteProject(@Arg('id') id: number): Promise<boolean> {
    await Project.delete(id);
    return true;
  }
}
