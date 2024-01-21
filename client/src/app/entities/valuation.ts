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

export class Valuation {
  id: number;
  code: string;
  chassisnumber: string;
  enginenumber: string;
  yearofmanufacture: string;
  dateofregistration: string;
  color: string;
  originalcolor: string;
  description: string;
  enginecapacity: string;
  fueltype: Fueltype;
  vehiclemodel: Vehiclemodel;
  province: Province;
  registrationno: string;
  tocreation: string;
  vehiclecondition: Vehiclecondition;
  creator: User;
  country:Country;
  vehicletype: Vehicletype;
  brand: Brand;
  odometerreading: number;
  marketvalue: number;
  forcedsalesvalue: number;
  valuationdate: string;
  valuationorganization: Valuationorganization;
  valuationstatus: Valuationstatus;
  vehicle: Vehicle;



  constructor(id: number = null) {
    this.id = id;
  }
}
export class ValuationDataPage extends DataPage{
    content: Valuation[];
}
