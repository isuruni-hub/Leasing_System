package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class BusinesscategoryData extends AbstractSeedClass {

    public BusinesscategoryData(){
        addIdNameData(1, "Agriculture and Fishing");
        addIdNameData(2, "Financial and Business Service");
        addIdNameData(3, "Manufacturing");
        addIdNameData(4, "Tourism");
        addIdNameData(5, "Transport");
        addIdNameData(6, "Construction");
        addIdNameData(7, "Trades");
        addIdNameData(8, "New Economy");
        addIdNameData(9, "Insfrastructure");
        addIdNameData(10, "Other Service");

    }

}
