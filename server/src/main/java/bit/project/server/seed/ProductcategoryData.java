package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class ProductcategoryData extends AbstractSeedClass {

    public ProductcategoryData(){
        addIdNameData(1, "Finance Lease VAT Zero");
        addIdNameData(2, "Finance Lease-Twheel");
        addIdNameData(3, "Finance Lease-Bike");
        addIdNameData(4, "Fintrex Smart Draft");
        addIdNameData(5, "Vehicle Loan(VH)");
        addIdNameData(6, "Smart Cash");
        addIdNameData(7, "Hire Purchase");
        addIdNameData(8, "Bike Lease-Registered");
    }

}
