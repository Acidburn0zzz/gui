import {AbstractDao} from "./abstract-dao";import {Model} from '../model';

export class DockerImageReadmeDao extends AbstractDao {
    public constructor() {
        super(Model.DockerImageReadme);
    }

}
