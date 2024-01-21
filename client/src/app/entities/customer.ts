import {User} from './user';
import {Gender} from './gender';
import {Nametitle} from './nametitle';
import {Civilstatus} from './civilstatus';
import {DataPage} from '../shared/data-page';
import {Customertype} from './customertype';
import {Customerstatus} from './customerstatus';
import {Businesscategory} from './businesscategory';
import {Nationality} from './nationality';
import {Customersubtype} from './customersubtype';
import {Customerincome} from './customerincome';
import {Customerexpense} from './customerexpense';
import {District} from './district';

export class Customer {
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
  customertype: Customertype;
  customersubtype: Customersubtype;
  customerstatus: Customerstatus;
  businesscategory: Businesscategory;
  civilstatus: Civilstatus;
  companyregno: string;
  proffesion: string;
  dob: string;
  nationality: Nationality;
  district: District;
  nametitle: Nametitle;
  cribno: string;
  gender: Gender;
  photo: string;
  customerincomeList: Customerincome[];
  customerexpenseList: Customerexpense[];


  constructor(id: number = null) {
    this.id = id;
  }
}
export class CustomerDataPage extends DataPage{
    content: Customer[];
}
