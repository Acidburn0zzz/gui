import { AbstractDao } from './abstract-dao';
import {Model} from "../model";

export class BootEnvironmentDao extends AbstractDao {

    public constructor() {
        super(Model.BootEnvironment, {
            eventName: 'entity-subscriber.boot.environment.changed'
        });
    }

    public activate(bootEnvironment: any) {
        return this.middlewareClient.submitTask('boot.environment.activate', [bootEnvironment.id]);
    }

    public clone(bootEnvironment: any, cloneName: string) {
        return this.middlewareClient.submitTask('boot.environment.clone', [cloneName, bootEnvironment.id]);
    }
}

