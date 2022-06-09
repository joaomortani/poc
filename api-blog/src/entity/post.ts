import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"
import { Length,  } from "class-validator"


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title: string

    @Column()
    subtitle: string

    @Column()
    content: string
}

export const postSchema = {
    id: { type: "number", required: true, example: 1 },
    title: { type: "string", required: true, example: "Hoje tem jogo" },
    subtitle: { type: "string", required: false, example: "vasco Lota maraca" },
    content: { type: "string", required: false, example: "Materia" }

}