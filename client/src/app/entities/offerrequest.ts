import {User} from './user';
import {DataPage} from '../shared/data-page';
import {Province} from './province';
import {Vehiclemodel} from './vehiclemodel';
import {Vehiclecondition} from './vehiclecondition';
import {Fueltype} from './fueltype';
import {Vehicletype} from './vehicletype';
import {Country} from './country';
import {Brand} from './brand';
import {Valuationorganization} from './valuationorganization';
import {Valuationstatus} from './valuationstatus';
import {Vehicle} from './vehicle';
import {Valuation} from './valuation';
import {Broker} from './broker';
import {Branch} from './branch';
import {Supplier} from './supplier';
import {Employee} from './employee';
import {Branchmanagerapproval} from './branchmanagerapproval';
import {Creditapproval} from './creditapproval';

export class Offerrequest {
  id: number;
  code: string;
  tocreation: string;
  vehicle:Vehicle;
  valuation: Valuation;
  broker: Broker;
  supplier: Supplier;
  branch: Branch;
  employee: Employee;
  description: string;
  duration: number;
  amount: number;
  rate: number;
  branchmanagerapproval: Branchmanagerapproval;
  creditapproval: Creditapproval;


  constructor(id: number = null) {
    this.id = id;
  }
}
export class OfferrequestDataPage extends DataPage{
    content: Offerrequest[];
}
