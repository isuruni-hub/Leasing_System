import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {TokenManager} from '../../shared/security/token-manager';
import {AuthenticationService} from '../../shared/authentication.service';
import {LoggedUser} from '../../shared/logged-user';
import {LinkItem} from '../../shared/link-item';
import {ThemeManager} from '../../shared/views/theme-manager';
import {UsecaseList} from '../../usecase-list';
import {NotificationService} from '../../services/notification.service';
import {PrimeNumbers} from '../../shared/prime-numbers';
import {Notification} from '../../entities/notification';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    if (!TokenManager.isContainsToken()){
      this.router.navigateByUrl('/login');
    }
  }

  get loggedUserName(): string{
    return LoggedUser.getName();
  }

  get loggedUserPhoto(): string{
    return LoggedUser.getPhoto();
  }

  refreshRate = PrimeNumbers.getRandomNumber();
  unreadNotificationCount = '0';
  isLive = true;
  sidenavOpen = false;
  sidenaveMode = 'side';
  usecasesLoaded = false;
  linkItems: LinkItem[] = [];
  isDark: boolean;
  latestNotifications: Notification[] = [];

  async loadData(): Promise<void>{
    this.notificationService.getUnreadCount().then((count) => {
      if (count > 99) { this.unreadNotificationCount = '99+'; }
      else{ this.unreadNotificationCount = count.toString(); }
    }).catch((e) => {
      console.log(e);
    });

    this.notificationService.getLatest().then(async (data) => {
      this.latestNotifications = data;
      for (const notification of data){
        if (!notification.dodelivered){
          await this.notificationService.setDelivered(notification.id);
        }
      }
    }).catch((e) => {
      console.log(e);
    });

  }

  setNotificationsAsRead(): void{
    for (const notification of this.latestNotifications){
      if (!notification.doread){
        this.notificationService.setRead(notification.id);
      }
    }
  }

  refreshData(): void{
    setTimeout( async () => {
      if (!this.isLive) { return; }
      try{
        await this.loadData();
      }finally {
        this.refreshData();
      }
    }, this.refreshRate);
  }

  async ngOnInit(): Promise<void> {
    this.userService.me().then((user) => {
      LoggedUser.user = user;
    });
    this.userService.myUsecases().then((usecases) => {
      LoggedUser.usecases = usecases;
      this.setLinkItems();
      this.usecasesLoaded = true;
    });
    this.setSidenavSettings();
    this.isDark = ThemeManager.isDark();
    await this.loadData();
    this.refreshData();
  }

  async logout(): Promise<void>{
    await this.authenticationService.destroyToken();
    TokenManager.destroyToken();
    LoggedUser.clear();
    this.router.navigateByUrl('/login');
  }

  setSidenavSettings(): void{
    const width = window.innerWidth;
    if (width < 992){
      this.sidenavOpen = false;
      this.sidenaveMode = 'over';
    }else{
      this.sidenavOpen = true;
      this.sidenaveMode = 'side';
    }
  }

  private setLinkItems(): void{
    const dashboardLink = new LinkItem('Dashboard', '/', 'dashboard');
    const userLink = new LinkItem('User Management', '', 'admin_panel_settings');
    const roleLink = new LinkItem('Role Management', '', 'assignment_ind');
    const supplierLink = new  LinkItem('Supplier Management', '/', 'local_shipping');
    const brokerLink = new  LinkItem('Broker Management', '/', 'person_pin');
    const branchLink = new  LinkItem('Branch Management', '/', 'home');
    const customerLink = new  LinkItem('Customer Management', '/', 'supervisor_account');
    const employeeLink = new LinkItem('Employee Management', '/', 'trip_origin');
    const valuationorganizationLink = new LinkItem('Valuation Organization Management', '/', 'home');
    const vehicleLink = new LinkItem('Vehicle Management', '/', 'commute');
    const valuationLink = new LinkItem('Valuation Detail Management', '/', 'commute');
    const insurancecompanyLink = new LinkItem('Insurance Company Management', '/', 'home');
    const offerLink = new LinkItem('Offer Management', '/', 'trip_origin');
    const offerrequestLink = new LinkItem('Offer Request Management', '/', 'trip_origin');
    const reportLink = new LinkItem('Reports', '/', 'analu');

    const showUserLink = new LinkItem('Show All Users', '/users', 'list');

    showUserLink.addUsecaseId(UsecaseList.SHOW_ALL_USERS);
    userLink.children.push(showUserLink);

    const addUserLink = new LinkItem('Add New User', '/users/add', 'add');
    addUserLink.addUsecaseId(UsecaseList.ADD_USER);
    userLink.children.push(addUserLink);

    const showRoleLink = new LinkItem('Show All Roles', '/roles', 'list');
    showRoleLink.addUsecaseId(UsecaseList.SHOW_ALL_ROLES);
    roleLink.children.push(showRoleLink);

    const addRoleLink = new LinkItem('Add New Role', '/roles/add', 'add');
    addRoleLink.addUsecaseId(UsecaseList.ADD_ROLE);
    roleLink.children.push(addRoleLink);

    const addNewEmployeeLink = new LinkItem('Add New Employee', 'employees/add', 'add');
    addNewEmployeeLink.addUsecaseId(UsecaseList.ADD_EMPLOYEE);
    employeeLink.children.push(addNewEmployeeLink);

    const showAllEmployeeLink = new LinkItem('Show All Employee', 'employees', 'list');
    showAllEmployeeLink.addUsecaseId(UsecaseList.SHOW_ALL_EMPLOYEES);
    employeeLink.children.push(showAllEmployeeLink);

    const addNewSupplierLink = new LinkItem('Add New Supplier', 'suppliers/add', 'add');
    addNewSupplierLink.addUsecaseId(UsecaseList.ADD_SUPPLIER);
    supplierLink.children.push(addNewSupplierLink);

    const showAllSupplierLink = new LinkItem('Show All Supplier', 'suppliers', 'list');
    showAllSupplierLink.addUsecaseId(UsecaseList.SHOW_ALL_SUPPLIERS);
    supplierLink.children.push(showAllSupplierLink);

    const addNewBrokerLink = new LinkItem('Add New Broker', 'brokers/add', 'add');
    addNewBrokerLink.addUsecaseId(UsecaseList.ADD_BROKER);
    brokerLink.children.push(addNewBrokerLink);

    const showAllBrokerLink = new LinkItem('Show All Broker', 'brokers', 'list');
    showAllBrokerLink.addUsecaseId(UsecaseList.SHOW_ALL_BROKERS);
    brokerLink.children.push(showAllBrokerLink);

    const addNewBranchLink = new LinkItem('Add New Branch', 'branches/add', 'add');
    addNewBranchLink.addUsecaseId(UsecaseList.ADD_BRANCH);
    branchLink.children.push(addNewBranchLink);

    const showAllBranchLink = new LinkItem('Show All Branch', 'branches', 'list');
    showAllBranchLink.addUsecaseId(UsecaseList.SHOW_ALL_BRANCHES);
    branchLink.children.push(showAllBranchLink);

    const addNewCustomerLink = new LinkItem('Add New Customer', 'customers/add', 'add');
    addNewCustomerLink.addUsecaseId(UsecaseList.ADD_CUSTOMER);
    customerLink.children.push(addNewCustomerLink);

    const showAllCustomerLink = new LinkItem('Show All Customer', 'customers', 'list');
    showAllCustomerLink.addUsecaseId(UsecaseList.SHOW_ALL_CUSTOMERS);
    customerLink.children.push(showAllCustomerLink);

    const addNewValuationorganizationLink = new LinkItem('Add New Valuationorganization', 'valuationorganizations/add', 'add');
    addNewValuationorganizationLink.addUsecaseId(UsecaseList.ADD_VALUATIONORGANIZATION);
    valuationorganizationLink.children.push(addNewValuationorganizationLink);

    const showAllValuationorganizationLink = new LinkItem('Show All Valuationorganization', 'valuationorganizations', 'list');
    showAllValuationorganizationLink.addUsecaseId(UsecaseList.SHOW_ALL_VALUATIONORGANIZATIONS);
    valuationorganizationLink.children.push(showAllValuationorganizationLink);

    const addNewVehicleLink = new LinkItem('Add New Vehicle', 'vehicles/add', 'add');
    addNewVehicleLink.addUsecaseId(UsecaseList.ADD_VEHICLE);
    vehicleLink.children.push(addNewVehicleLink);

    const showAllVehicleLink = new LinkItem('Show All Vehicle', 'vehicles', 'list');
    showAllVehicleLink.addUsecaseId(UsecaseList.SHOW_ALL_VEHICLES);
    vehicleLink.children.push(showAllVehicleLink);


    const addNewValuationLink = new LinkItem('Add New Valuation', 'valuations/add', 'add');
    addNewValuationLink.addUsecaseId(UsecaseList.ADD_VALUATION);
    valuationLink.children.push(addNewValuationLink);

    const showAllValuationLink = new LinkItem('Show All Valuation', 'valuations', 'list');
    showAllValuationLink.addUsecaseId(UsecaseList.SHOW_ALL_VALUATIONS);
    valuationLink.children.push(showAllValuationLink);

    const addNewInsurancecompanyLink = new LinkItem('Add New Insurancecompany', 'insurancecompanies/add', 'add');
    addNewInsurancecompanyLink.addUsecaseId(UsecaseList.ADD_INSURANCECOMPANY);
    insurancecompanyLink.children.push(addNewInsurancecompanyLink);

    const showAllInsurancecompanyLink = new LinkItem('Show All Insurancecompany', 'insurancecompanies', 'list');
    showAllInsurancecompanyLink.addUsecaseId(UsecaseList.SHOW_ALL_INSURANCECOMPANIES);
    insurancecompanyLink.children.push(showAllInsurancecompanyLink);

    const addNewOfferLink = new LinkItem('Add New Offer', 'offers/add', 'add');
    addNewOfferLink.addUsecaseId(UsecaseList.ADD_OFFER);
    offerLink.children.push(addNewOfferLink);

    const showAllOfferLink = new LinkItem('Show All Offer', 'offers', 'list');
    showAllOfferLink.addUsecaseId(UsecaseList.SHOW_ALL_OFFERS);
    offerLink.children.push(showAllOfferLink);

    const addNewOfferrequestLink = new LinkItem('Add New Offerrequest', 'offerrequests/add', 'add');
    addNewOfferrequestLink.addUsecaseId(UsecaseList.ADD_OFFERREQUEST);
    offerrequestLink.children.push(addNewOfferrequestLink);

    const showAllOfferrequestLink = new LinkItem('Show All Offerrequest', 'offerrequests', 'list');
    showAllOfferrequestLink.addUsecaseId(UsecaseList.SHOW_ALL_OFFERREQUESTS);
    offerrequestLink.children.push(showAllOfferrequestLink);

    const showYearWiseVehicleCountLink = new LinkItem('Show All Vehicle Count', 'reports/year-wise-vehicle-count', 'assignment');
    showYearWiseVehicleCountLink.addUsecaseId(UsecaseList.SHOW_YEAR_WISE_VEHICLE_COUNT);
    reportLink.children.push(showYearWiseVehicleCountLink);







    this.linkItems.push(dashboardLink);
    this.linkItems.push(userLink);
    this.linkItems.push(roleLink);
    this.linkItems.push(employeeLink);
    this.linkItems.push(supplierLink);
    this.linkItems.push(brokerLink);
    this.linkItems.push(branchLink);
    this.linkItems.push(customerLink);
    this.linkItems.push(valuationorganizationLink);
    this.linkItems.push(vehicleLink);
    this.linkItems.push(valuationLink);
    this.linkItems.push(insurancecompanyLink);
    this.linkItems.push(offerLink);
    this.linkItems.push(offerrequestLink);
    this.linkItems.push(reportLink);

  }

  changeTheme(e): void{
    if (e.checked){
      ThemeManager.setDark(true);
      this.isDark = true;
    }else{
      ThemeManager.setDark(false);
      this.isDark = false;
    }
  }

  ngOnDestroy(): void {
    this.isLive = false;
  }
}
