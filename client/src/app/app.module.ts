import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { MainWindowComponent } from './views/main-window/main-window.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PageHeaderComponent } from './shared/views/page-header/page-header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './shared/interceptor';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTreeModule} from '@angular/material/tree';
import { NavigationComponent } from './shared/views/navigation/navigation.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RoleDetailComponent } from './views/modules/role/role-detail/role-detail.component';
import { RoleFormComponent } from './views/modules/role/role-form/role-form.component';
import { RoleTableComponent } from './views/modules/role/role-table/role-table.component';
import { RoleUpdateFormComponent } from './views/modules/role/role-update-form/role-update-form.component';
import { UserDetailComponent } from './views/modules/user/user-detail/user-detail.component';
import { UserFormComponent } from './views/modules/user/user-form/user-form.component';
import { UserTableComponent } from './views/modules/user/user-table/user-table.component';
import { UserUpdateFormComponent } from './views/modules/user/user-update-form/user-update-form.component';
import { ChangePasswordComponent } from './views/modules/user/change-password/change-password.component';
import { ResetPasswordComponent } from './views/modules/user/reset-password/reset-password.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from './shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EmptyDataTableComponent } from './shared/views/empty-data-table/empty-data-table.component';
import { LoginTimeOutDialogComponent } from './shared/views/login-time-out-dialog/login-time-out-dialog.component';
import { Nl2brPipe } from './shared/nl2br.pipe';
import { NoPrivilegeComponent } from './shared/views/no-privilege/no-privilege.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { AdminConfigurationComponent } from './views/admin-configuration/admin-configuration.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ObjectNotFoundComponent } from './shared/views/object-not-found/object-not-found.component';
import { LoadingComponent } from './shared/views/loading/loading.component';
import { ConfirmDialogComponent } from './shared/views/confirm-dialog/confirm-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DualListboxComponent } from './shared/ui-components/dual-listbox/dual-listbox.component';
import {FileChooserComponent} from './shared/ui-components/file-chooser/file-chooser.component';
import { ChangePhotoComponent } from './views/modules/user/change-photo/change-photo.component';
import { MyAllNotificationComponent } from './views/modules/user/my-all-notification/my-all-notification.component';
import {EmployeeTableComponent} from './views/modules/employee/employee-table/employee-table.component';
import {EmployeeFormComponent} from './views/modules/employee/employee-form/employee-form.component';
import {EmployeeDetailComponent} from './views/modules/employee/employee-detail/employee-detail.component';
import {EmployeeUpdateFormComponent} from './views/modules/employee/employee-update-form/employee-update-form.component';
import { SupplierDetailComponent } from './views/modules/supplier/supplier-detail/supplier-detail.component';
import { SupplierFormComponent } from './views/modules/supplier/supplier-form/supplier-form.component';
import { SupplierTableComponent } from './views/modules/supplier/supplier-table/supplier-table.component';
import { SupplierUpdateFormComponent } from './views/modules/supplier/supplier-update-form/supplier-update-form.component';
import { BrokerDetailComponent } from './views/modules/broker/broker-detail/broker-detail.component';
import { BrokerFormComponent } from './views/modules/broker/broker-form/broker-form.component';
import { BrokerTableComponent } from './views/modules/broker/broker-table/broker-table.component';
import { BrokerUpdateFormComponent } from './views/modules/broker/broker-update-form/broker-update-form.component';
import { BranchDetailComponent } from './views/modules/branch/branch-detail/branch-detail.component';
import { BranchFormComponent } from './views/modules/branch/branch-form/branch-form.component';
import { BranchTableComponent } from './views/modules/branch/branch-table/branch-table.component';
import { BranchUpdateFormComponent } from './views/modules/branch/branch-update-form/branch-update-form.component';
import { CustomerDetailComponent } from './views/modules/customer/customer-detail/customer-detail.component';
import { CustomerFormComponent } from './views/modules/customer/customer-form/customer-form.component';
import { CustomerTableComponent } from './views/modules/customer/customer-table/customer-table.component';
import { CustomerUpdateFormComponent } from './views/modules/customer/customer-update-form/customer-update-form.component';
import {ValuationorganizationDetailComponent} from './views/modules/valuationorganization/valuationorganization-detail/valuationorganization-detail.component';
import {ValuationorganizationFormComponent} from './views/modules/valuationorganization/valuationorganization-form/valuationorganization-form.component';
import {ValuationorganizationTableComponent} from './views/modules/valuationorganization/valuationorganization-table/valuationorganization-table.component';
import {ValuationorganizationUpdateFormComponent} from './views/modules/valuationorganization/valuationorganization-update-form/valuationorganization-update-form.component';
import {VehicleDetailComponent} from './views/modules/vehicle/vehicle-detail/vehicle-detail.component';
import {VehicleFormComponent} from './views/modules/vehicle/vehicle-form/vehicle-form.component';
import {VehicleTableComponent} from './views/modules/vehicle/vehicle-table/vehicle-table.component';
import {VehicleUpdateFormComponent} from './views/modules/vehicle/vehicle-update-form/vehicle-update-form.component';
import {CustomerincomeSubFormComponent} from './views/modules/customer/customer-form/customerincome-sub-form/customerincome-sub-form.component';
import {CustomerexpenseSubFormComponent} from './views/modules/customer/customer-form/customerexpense-sub-form/customerexpense-sub-form.component';
import { ValuationDetailComponent } from './views/modules/valuation/valuation-detail/valuation-detail.component';
import { ValuationFormComponent } from './views/modules/valuation/valuation-form/valuation-form.component';
import { ValuationTableComponent } from './views/modules/valuation/valuation-table/valuation-table.component';
import { ValuationUpdateFormComponent } from './views/modules/valuation/valuation-update-form/valuation-update-form.component';
import { InsurancecompanyDetailComponent } from './views/modules/insurancecompany/insurancecompany-detail/insurancecompany-detail.component';
import { InsurancecompanyFormComponent } from './views/modules/insurancecompany/insurancecompany-form/insurancecompany-form.component';
import { InsurancecompanyTableComponent } from './views/modules/insurancecompany/insurancecompany-table/insurancecompany-table.component';
import { InsurancecompanyUpdateFormComponent } from './views/modules/insurancecompany/insurancecompany-update-form/insurancecompany-update-form.component';
import { OfferDetailComponent } from './views/modules/offer/offer-detail/offer-detail.component';
import { OfferFormComponent } from './views/modules/offer/offer-form/offer-form.component';
import { OfferTableComponent } from './views/modules/offer/offer-table/offer-table.component';
import { OfferUpdateFormComponent } from './views/modules/offer/offer-update-form/offer-update-form.component';
import { InstallmentSubFormComponent } from './views/modules/offer/offer-form/installment-sub-form/installment-sub-form.component';
import { OfferrequestDetailComponent } from './views/modules/offerrequest/offerrequest-detail/offerrequest-detail.component';
import { OfferrequestFormComponent } from './views/modules/offerrequest/offerrequest-form/offerrequest-form.component';
import { OfferrequestUpdateFormComponent } from './views/modules/offerrequest/offerrequest-update-form/offerrequest-update-form.component';
import { OfferrequestTableComponent } from './views/modules/offerrequest/offerrequest-table/offerrequest-table.component';
import { YearWiseVehicleCountComponent } from './views/modules/reports/year-wise-vehicle-count/year-wise-vehicle-count.component';
import {MatTableExporterModule} from 'mat-table-exporter';
import {ChartsModule} from 'ng2-charts';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainWindowComponent,
        DashboardComponent,
        PageNotFoundComponent,
        PageHeaderComponent,
        NavigationComponent,
        RoleDetailComponent,
        RoleFormComponent,
        RoleTableComponent,
        RoleUpdateFormComponent,
        UserDetailComponent,
        UserFormComponent,
        UserTableComponent,
        UserUpdateFormComponent,
        ChangePasswordComponent,
        ResetPasswordComponent,
        DeleteConfirmDialogComponent,
        EmptyDataTableComponent,
        LoginTimeOutDialogComponent,
        Nl2brPipe,
        NoPrivilegeComponent,
        AdminConfigurationComponent,
        FileChooserComponent,
        ObjectNotFoundComponent,
        LoadingComponent,
        ConfirmDialogComponent,
        DualListboxComponent,
        ChangePhotoComponent,
        MyAllNotificationComponent,
        EmployeeTableComponent,
        EmployeeFormComponent,
        EmployeeDetailComponent,
        EmployeeUpdateFormComponent,
        SupplierDetailComponent,
        SupplierFormComponent,
        SupplierTableComponent,
        SupplierUpdateFormComponent,
        BrokerDetailComponent,
        BrokerFormComponent,
        BrokerTableComponent,
        BrokerUpdateFormComponent,
        BranchDetailComponent,
        BranchFormComponent,
        BranchTableComponent,
        BranchUpdateFormComponent,
        CustomerDetailComponent,
        CustomerFormComponent,
        CustomerTableComponent,
        CustomerUpdateFormComponent,
        CustomerincomeSubFormComponent,
        CustomerexpenseSubFormComponent,
        ValuationorganizationDetailComponent,
        ValuationorganizationFormComponent,
        ValuationorganizationTableComponent,
        ValuationorganizationUpdateFormComponent,
        VehicleDetailComponent,
        VehicleFormComponent,
        VehicleTableComponent,
        VehicleUpdateFormComponent,
        ValuationDetailComponent,
        ValuationFormComponent,
        ValuationTableComponent,
        ValuationUpdateFormComponent,
        InsurancecompanyDetailComponent,
        InsurancecompanyFormComponent,
        InsurancecompanyTableComponent,
        InsurancecompanyUpdateFormComponent,
        OfferDetailComponent,
        OfferFormComponent,
        OfferTableComponent,
        OfferUpdateFormComponent,
        InstallmentSubFormComponent,
        OfferrequestDetailComponent,
        OfferrequestFormComponent,
        OfferrequestUpdateFormComponent,
        OfferrequestTableComponent,
        YearWiseVehicleCountComponent,


    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTooltipModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableExporterModule,
    ChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
