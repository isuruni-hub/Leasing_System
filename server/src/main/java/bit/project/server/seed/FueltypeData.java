package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class FueltypeData extends AbstractSeedClass {

    public FueltypeData(){
        addIdNameData(1, "Petrol");
        addIdNameData(2, "Diesel");
        addIdNameData(3, "Hybrid");
        addIdNameData(4, "Electrical");
    }

}
