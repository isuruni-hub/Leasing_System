import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {MainWindowComponent} from './views/main-window/main-window.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {UserTableComponent} from './views/modules/user/user-table/user-table.component';
import {UserFormComponent} from './views/modules/user/user-form/user-form.component';
import {UserDetailComponent} from './views/modules/user/user-detail/user-detail.component';
import {UserUpdateFormComponent} from './views/modules/user/user-update-form/user-update-form.component';
import {RoleTableComponent} from './views/modules/role/role-table/role-table.component';
import {RoleFormComponent} from './views/modules/role/role-form/role-form.component';
import {RoleDetailComponent} from './views/modules/role/role-detail/role-detail.component';
import {RoleUpdateFormComponent} from './views/modules/role/role-update-form/role-update-form.component';
import {ChangePasswordComponent} from './views/modules/user/change-password/change-password.component';
import {ResetPasswordComponent} from './views/modules/user/reset-password/reset-password.component';
import {ChangePhotoComponent} from './views/modules/user/change-photo/change-photo.component';
import {MyAllNotificationComponent} from './views/modules/user/my-all-notification/my-all-notification.component';
import {EmployeeTableComponent} from './views/modules/employee/employee-table/employee-table.component';
import {EmployeeFormComponent} from './views/modules/employee/employee-form/employee-form.component';
import {EmployeeDetailComponent} from './views/modules/employee/employee-detail/employee-detail.component';
import {EmployeeUpdateFormComponent} from './views/modules/employee/employee-update-form/employee-update-form.component';
import {SupplierTableComponent} from './views/modules/supplier/supplier-table/supplier-table.component';
import {SupplierFormComponent} from './views/modules/supplier/supplier-form/supplier-form.component';
import {SupplierDetailComponent} from './views/modules/supplier/supplier-detail/supplier-detail.component';
import {SupplierUpdateFormComponent} from './views/modules/supplier/supplier-update-form/supplier-update-form.component';
import {BrokerTableComponent} from './views/modules/broker/broker-table/broker-table.component';
import {BrokerFormComponent} from './views/modules/broker/broker-form/broker-form.component';
import {BrokerDetailComponent} from './views/modules/broker/broker-detail/broker-detail.component';
import {BrokerUpdateFormComponent} from './views/modules/broker/broker-update-form/broker-update-form.component';
import {BranchUpdateFormComponent} from './views/modules/branch/branch-update-form/branch-update-form.component';
import {BranchDetailComponent} from './views/modules/branch/branch-detail/branch-detail.component';
import {BranchFormComponent} from './views/modules/branch/branch-form/branch-form.component';
import {BranchTableComponent} from './views/modules/branch/branch-table/branch-table.component';
import {CustomerTableComponent} from './views/modules/customer/customer-table/customer-table.component';
import {CustomerFormComponent} from './views/modules/customer/customer-form/customer-form.component';
import {CustomerDetailComponent} from './views/modules/customer/customer-detail/customer-detail.component';
import {CustomerUpdateFormComponent} from './views/modules/customer/customer-update-form/customer-update-form.component';
import {ValuationorganizationTableComponent} from './views/modules/valuationorganization/valuationorganization-table/valuationorganization-table.component';
import {ValuationorganizationFormComponent} from './views/modules/valuationorganization/valuationorganization-form/valuationorganization-form.component';
import {ValuationorganizationDetailComponent} from './views/modules/valuationorganization/valuationorganization-detail/valuationorganization-detail.component';
import {ValuationorganizationUpdateFormComponent} from './views/modules/valuationorganization/valuationorganization-update-form/valuationorganization-update-form.component';
import {VehicleTableComponent} from './views/modules/vehicle/vehicle-table/vehicle-table.component';
import {VehicleFormComponent} from './views/modules/vehicle/vehicle-form/vehicle-form.component';
import {VehicleDetailComponent} from './views/modules/vehicle/vehicle-detail/vehicle-detail.component';
import {VehicleUpdateFormComponent} from './views/modules/vehicle/vehicle-update-form/vehicle-update-form.component';
import {ValuationTableComponent} from './views/modules/valuation/valuation-table/valuation-table.component';
import {ValuationFormComponent} from './views/modules/valuation/valuation-form/valuation-form.component';
import {ValuationDetailComponent} from './views/modules/valuation/valuation-detail/valuation-detail.component';
import {ValuationUpdateFormComponent} from './views/modules/valuation/valuation-update-form/valuation-update-form.component';
import {InsurancecompanyTableComponent} from './views/modules/insurancecompany/insurancecompany-table/insurancecompany-table.component';
import {InsurancecompanyFormComponent} from './views/modules/insurancecompany/insurancecompany-form/insurancecompany-form.component';
import {InsurancecompanyDetailComponent} from './views/modules/insurancecompany/insurancecompany-detail/insurancecompany-detail.component';
import {InsurancecompanyUpdateFormComponent} from './views/modules/insurancecompany/insurancecompany-update-form/insurancecompany-update-form.component';
import {OfferTableComponent} from './views/modules/offer/offer-table/offer-table.component';
import {OfferFormComponent} from './views/modules/offer/offer-form/offer-form.component';
import {OfferDetailComponent} from './views/modules/offer/offer-detail/offer-detail.component';
import {OfferUpdateFormComponent} from './views/modules/offer/offer-update-form/offer-update-form.component';
import { OfferrequestTableComponent } from './views/modules/offerrequest/offerrequest-table/offerrequest-table.component';
import { OfferrequestFormComponent } from './views/modules/offerrequest/offerrequest-form/offerrequest-form.component';
import { OfferrequestDetailComponent } from './views/modules/offerrequest/offerrequest-detail/offerrequest-detail.component';
import { OfferrequestUpdateFormComponent } from './views/modules/offerrequest/offerrequest-update-form/offerrequest-update-form.component';
import {YearWiseVehicleCountComponent} from './views/modules/reports/year-wise-vehicle-count/year-wise-vehicle-count.component';

// @ts-ignore
// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: MainWindowComponent,
    children: [

      {path: 'users', component: UserTableComponent},
      {path: 'users/add', component: UserFormComponent},
      {path: 'users/change-my-password', component: ChangePasswordComponent},
      {path: 'users/change-my-photo', component: ChangePhotoComponent},
      {path: 'users/my-all-notifications', component: MyAllNotificationComponent},
      {path: 'users/reset-password', component: ResetPasswordComponent},
      {path: 'users/:id', component: UserDetailComponent},
      {path: 'users/edit/:id', component: UserUpdateFormComponent},

      {path: 'roles', component: RoleTableComponent},
      {path: 'roles/add', component: RoleFormComponent},
      {path: 'roles/:id', component: RoleDetailComponent},
      {path: 'roles/edit/:id', component: RoleUpdateFormComponent},

      {path: 'employees', component: EmployeeTableComponent},
      {path: 'employees/add', component: EmployeeFormComponent},
      {path: 'employees/:id', component: EmployeeDetailComponent},
      {path: 'employees/edit/:id', component: EmployeeUpdateFormComponent},

      {path: 'brokers', component: BrokerTableComponent},
      {path: 'brokers/add', component: BrokerFormComponent},
      {path: 'brokers/:id', component: BrokerDetailComponent},
      {path: 'brokers/edit/:id', component: BrokerUpdateFormComponent},

      {path: 'branches', component: BranchTableComponent},
      {path: 'branches/add', component: BranchFormComponent},
      {path: 'branches/:id', component: BranchDetailComponent},
      {path: 'branches/edit/:id', component: BranchUpdateFormComponent},

      {path: 'suppliers', component: SupplierTableComponent},
      {path: 'suppliers/add', component: SupplierFormComponent},
      {path: 'suppliers/:id', component: SupplierDetailComponent},
      {path: 'suppliers/edit/:id', component: SupplierUpdateFormComponent},


      {path: 'customers', component: CustomerTableComponent},
      {path: 'customers/add', component: CustomerFormComponent},
      {path: 'customers/:id', component: CustomerDetailComponent},
      {path: 'customers/edit/:id', component: CustomerUpdateFormComponent},

      {path: 'valuationorganizations', component: ValuationorganizationTableComponent},
      {path: 'valuationorganizations/add', component: ValuationorganizationFormComponent},
      {path: 'valuationorganizations/:id', component: ValuationorganizationDetailComponent},
      {path: 'valuationorganizations/edit/:id', component: ValuationorganizationUpdateFormComponent},


      {path: 'vehicles', component: VehicleTableComponent},
      {path: 'vehicles/add', component: VehicleFormComponent},
      {path: 'vehicles/:id', component: VehicleDetailComponent},
      {path: 'vehicles/edit/:id', component: VehicleUpdateFormComponent},

      {path: 'valuations', component: ValuationTableComponent},
      {path: 'valuations/add', component: ValuationFormComponent},
      {path: 'valuations/:id', component: ValuationDetailComponent},
      {path: 'valuations/edit/:id', component: ValuationUpdateFormComponent},


      {path: 'insurancecompanies', component: InsurancecompanyTableComponent},
      {path: 'insurancecompanies/add', component: InsurancecompanyFormComponent},
      {path: 'insurancecompanies/:id', component: InsurancecompanyDetailComponent},
      {path: 'insurancecompanies/edit/:id', component: InsurancecompanyUpdateFormComponent},

      {path: 'offers', component: OfferTableComponent},
      {path: 'offers/add', component: OfferFormComponent},
      {path: 'offers/:id', component: OfferDetailComponent},
      {path: 'offers/edit/:id', component: OfferUpdateFormComponent},

      {path: 'offerrequests', component: OfferrequestTableComponent},
      {path: 'offerrequests/add', component: OfferrequestFormComponent},
      {path: 'offerrequests/:id', component: OfferrequestDetailComponent},
      {path: 'offerrequests/edit/:id', component: OfferrequestUpdateFormComponent},

      {path: 'reports/year-wise-vehicle-count', component: YearWiseVehicleCountComponent},



      {path: 'dashboard', component: DashboardComponent},
      {path: '', component: DashboardComponent},
    ]
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
