import {AbstractDao} from "./abstract-dao";import {Model} from '../model';
export class FreenasCredentialsDao extends AbstractDao {
    public constructor() {
        super(Model.FreenasCredentials);
    }
}
