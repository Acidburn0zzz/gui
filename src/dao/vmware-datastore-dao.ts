import { AbstractDao } from './abstract-dao';
import * as _ from 'lodash';
import {Model} from '../model';

export class VmwareDatastoreDao extends AbstractDao {

    public constructor() {
        super(Model.VmwareDatastore);
    }

    public listDatastoresOnPeer(peer: any): Promise<Array<any>> {
        return this.middlewareClient.callRpcMethod('vmware.get_datastores', [
            peer.credentials.address,
            peer.credentials.username,
            peer.credentials.password,
            false
        ]).then((datastores) => _.forEach(datastores, (datastore) => datastore._objectType = 'VmwareDatastore'));
    }

}

