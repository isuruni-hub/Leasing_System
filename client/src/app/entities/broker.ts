import {User} from './user';
import {DataPage} from '../shared/data-page';
import {Nametitle} from './nametitle';

export class Broker {
  id: number;
  code: string;
  tocreation: string;
  description: string;
  name: string;
  contact1: string;
  contact2: string;
  nic: string;
  passport: string;
  address: string;
  email: string;
  fax: string;
  creator: User;
  nametitle: Nametitle;




  constructor(id: number = null) {
    this.id = id;
  }
}


export class BrokerDataPage extends DataPage {
  content: Broker[];
}
