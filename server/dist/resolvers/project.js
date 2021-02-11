"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResolver = void 0;
const Project_1 = require("../entities/Project");
const type_graphql_1 = require("type-graphql");
let ProjectData = class ProjectData {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectData.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectData.prototype, "featureImage", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectData.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectData.prototype, "tags", void 0);
ProjectData = __decorate([
    type_graphql_1.InputType()
], ProjectData);
let ProjectResolver = class ProjectResolver {
    projects() {
        return __awaiter(this, void 0, void 0, function* () {
            return Project_1.Project.find();
        });
    }
    project(id) {
        return Project_1.Project.findOne(id);
    }
    createProject(projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            return Project_1.Project.create({
                title: projectData.title,
                featureImage: projectData.featureImage,
                content: projectData.content,
                tags: projectData.tags,
            }).save();
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Project_1.Project.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Project_1.Project]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "projects", null);
__decorate([
    type_graphql_1.Query(() => Project_1.Project, { nullable: true }),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
__decorate([
    type_graphql_1.Mutation(() => Project_1.Project),
    __param(0, type_graphql_1.Arg('projectData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProjectData]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteProject", null);
ProjectResolver = __decorate([
    type_graphql_1.Resolver()
], ProjectResolver);
exports.ProjectResolver = ProjectResolver;
//# sourceMappingURL=project.js.map