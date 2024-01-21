package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class VehicleconditionData extends AbstractSeedClass {

    public VehicleconditionData(){
        addIdNameData(1, "New");
        addIdNameData(2, "Used");
        addIdNameData(3, "Reconditioned");

    }

}
