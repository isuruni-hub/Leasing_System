import {User} from './user';
// @ts-ignore
import {Suppliertype} from './suppliertype';
import {DataPage} from '../shared/data-page';
import {Nametitle} from './nametitle';

export class Supplier {
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
  companyregno: string;
  creator: User;
  suppliertype: Suppliertype;
  nametitle: Nametitle;
  companycontactperson: string;




  constructor(id: number = null) {
    this.id = id;
  }
}

export class SupplierDataPage extends DataPage {
  content: Supplier[];
}
