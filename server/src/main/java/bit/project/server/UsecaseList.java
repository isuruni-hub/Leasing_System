package bit.project.server;

import bit.project.server.util.security.SystemModule;

public enum UsecaseList{
    @SystemModule("User") SHOW_ALL_USERS(1),
    @SystemModule("User") SHOW_USER_DETAILS(2),
    @SystemModule("User") ADD_USER(3),
    @SystemModule("User") UPDATE_USER(4),
    @SystemModule("User") DELETE_USER(5),

    @SystemModule("User") RESET_USER_PASSWORDS(6),
    @SystemModule("Role") SHOW_ALL_ROLES(7),
    @SystemModule("Role") SHOW_ROLE_DETAILS(8),
    @SystemModule("Role") ADD_ROLE(9),
    @SystemModule("Role") UPDATE_ROLE(10),
    @SystemModule("Role") DELETE_ROLE(11),

    @SystemModule("Employee") SHOW_ALL_EMPLOYEES(12),
    @SystemModule("Employee") SHOW_EMPLOYEE_DETAILS(13),
    @SystemModule("Employee") ADD_EMPLOYEE(14),
    @SystemModule("Employee") UPDATE_EMPLOYEE(15),
    @SystemModule("Employee") DELETE_EMPLOYEE(16),

    @SystemModule("Broker") SHOW_ALL_BROKERS(17),
    @SystemModule("Broker") SHOW_BROKER_DETAILS(18),
    @SystemModule("Broker") ADD_BROKER(19),
    @SystemModule("Broker") UPDATE_BROKER(20),
    @SystemModule("Broker") DELETE_BROKER(21),

    @SystemModule("Branch") SHOW_ALL_BRANCHES(22),
    @SystemModule("Branch") SHOW_BRANCH_DETAILS(23),
    @SystemModule("Branch") ADD_BRANCH(24),
    @SystemModule("Branch") UPDATE_BRANCH(25),
    @SystemModule("Branch") DELETE_BRANCH(26),

    @SystemModule("Supplier") SHOW_ALL_SUPPLIERS(27),
    @SystemModule("Supplier") SHOW_SUPPLIER_DETAILS(28),
    @SystemModule("Supplier") ADD_SUPPLIER(29),
    @SystemModule("Supplier") UPDATE_SUPPLIER(30),
    @SystemModule("Supplier") DELETE_SUPPLIER(31),

    @SystemModule("Customer") SHOW_ALL_CUSTOMERS(32),
    @SystemModule("Customer") SHOW_CUSTOMER_DETAILS(33),
    @SystemModule("Customer") ADD_CUSTOMER(34),
    @SystemModule("Customer") UPDATE_CUSTOMER(35),
    @SystemModule("Customer") DELETE_CUSTOMER(36),
    // @SystemModule("Customer") DELETE_CUSTOMERINCOME(37),
    // @SystemModule("Customer") DELETE_CUSTOMEREXPENSE(38),

    @SystemModule("Valuationorganization") SHOW_ALL_VALUATIONORGANIZATIONS(38),
    @SystemModule("Valuationorganization") SHOW_VALUATIONORGANIZATION_DETAILS(39),
    @SystemModule("Valuationorganization") ADD_VALUATIONORGANIZATION(40),
    @SystemModule("Valuationorganization") UPDATE_VALUATIONORGANIZATION(41),
    @SystemModule("Valuationorganization") DELETE_VALUATIONORGANIZATION(42),

    @SystemModule("Vehicle") SHOW_ALL_VEHICLES(43),
    @SystemModule("Vehicle") SHOW_VEHICLE_DETAILS(44),
    @SystemModule("Vehicle") ADD_VEHICLE(45),
    @SystemModule("Vehicle") UPDATE_VEHICLE(46),
    @SystemModule("Vehicle") DELETE_VEHICLE(47),

    @SystemModule("Valuation") SHOW_ALL_VALUATIONS(48),
    @SystemModule("Valuation") SHOW_VALUATION_DETAILS(49),
    @SystemModule("Valuation") ADD_VALUATION(50),
    @SystemModule("Valuation") UPDATE_VALUATION(51),
    @SystemModule("Valuation") DELETE_VALUATION(52),

    @SystemModule("Insurancecompany") SHOW_ALL_INSURANCECOMPANIES(53),
    @SystemModule("Insurancecompany") SHOW_INSURANCECOMPANY_DETAILS(54),
    @SystemModule("Insurancecompany") ADD_INSURANCECOMPANY(55),
    @SystemModule("Insurancecompany") UPDATE_INSURANCECOMPANY(56),
    @SystemModule("Insurancecompany") DELETE_INSURANCECOMPANY(57),

    @SystemModule("Offer") SHOW_ALL_OFFERS(58),
    @SystemModule("Offer") SHOW_OFFER_DETAILS(59),
    @SystemModule("Offer") ADD_OFFER(60),
    @SystemModule("Offer") UPDATE_OFFER(61),
    @SystemModule("Offer") DELETE_OFFER(62),
    @SystemModule("Offer") DELETE_INSTALLMENT(63),

    @SystemModule("Offerrequest") SHOW_ALL_OFFERREQUESTS(64),
    @SystemModule("Offerrequest") SHOW_OFFERREQUEST_DETAILS(65),
    @SystemModule("Offerrequest") ADD_OFFERREQUEST(66),
    @SystemModule("Offerrequest") UPDATE_OFFERREQUEST(67),
    @SystemModule("Offerrequest") DELETE_OFFERREQUEST(68),

    @SystemModule("Report") SHOW_YEAR_WISE_VEHICLE_COUNT(69);




    public final int value;

    UsecaseList(int value){
        this.value = value;
    }

}
