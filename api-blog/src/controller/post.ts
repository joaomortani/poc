import { Context } from "koa";
import { getManager, Repository, Not, Equal, Like } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { request, summary, path, body, responsesAll, tagsAll, responses } from "koa-swagger-decorator";
import { Post, postSchema } from "../entity/post";

@responsesAll({ 200: { description: "success"}, 400: { description: "Bad Server - Try again"}, 401:  { description: "unauthorized, missing/wrong jwt token"}})
@tagsAll(["Post"])
export default class postController {
   
    @request("post", "/post")
    @summary("Insert a post")
    @body(postSchema)
    public static async createPost(ctx:Context): Promise<void> {

        const postRepository: Repository<Post> = getManager().getRepository(Post);

        const postToBeSaved: Post = new Post();
        postToBeSaved.title = ctx.request.body.title;
        postToBeSaved.subtitle = ctx.request.body.subtitle;
        postToBeSaved.content = ctx.request.body.content;

        const errors: ValidationError[] = await validate(postToBeSaved);

        if ( errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        }else if ( await postRepository.findOne({ title: postToBeSaved.title })){
            ctx.status = 400;
            ctx.body = "Titulo já existente";
        }else {
            const post = await postRepository.save(postToBeSaved);
            
            ctx.status = 201;
            ctx.body = post;
        }
        
    }

}