import {User} from './user';
import {DataPage} from '../shared/data-page';
import {Nametitle} from './nametitle';
import {Branchstatus} from './branchstatus';


export class Branch {
  id: number;
  code: string;
  tocreation: string;
  description: string;
  name: string;
  tel1: string;
  tel2: string;
  email: string;
  fax: string;
  address: string;
  creator: User;
  branchstatus: Branchstatus;



  constructor(id: number = null) {
    this.id = id;
  }
}


export class BranchDataPage extends DataPage {
  content: Branch[];
}
