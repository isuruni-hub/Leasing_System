package bit.project.server.seed;

import java.util.Hashtable;
import bit.project.server.util.seed.SeedClass;
import bit.project.server.util.seed.AbstractSeedClass;

@SeedClass
public class DesignationData extends AbstractSeedClass {

    public DesignationData(){
        addIdNameData(1, "Manager");
        addIdNameData(2, "Receptionist");
        addIdNameData(3, "Junior Exective Operation");
        addIdNameData(4, "Senior Exective Operation");
        addIdNameData(5, "Junior Exective Marketing");
        addIdNameData(6, "Senior Exective Marketing");
        addIdNameData(7, "Junior Exective Cashier");
        addIdNameData(8, "Senior Exective Cashier");
        addIdNameData(9, "Regional Manager");
        addIdNameData(10, "Junior Exective Recovery");
        addIdNameData(11, "Senior Exective Recovery");
        addIdNameData(12, "Assistant Manager");
    }

}
