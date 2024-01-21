import {User} from './user';
import {DataPage} from '../shared/data-page';
import {Province} from './province';
import {Vehiclemodel} from './vehiclemodel';
import {Vehiclecondition} from './vehiclecondition';
import {Fueltype} from './fueltype';
import {Vehicletype} from './vehicletype';
import {Country} from './country';
import {Brand} from './brand';

export class Vehicle {
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
  seatingcapacity: string;

  constructor(id: number = null) {
    this.id = id;
  }
}
export class VehicleDataPage extends DataPage{
    content: Vehicle[];
}
