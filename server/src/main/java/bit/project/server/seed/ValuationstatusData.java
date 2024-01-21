package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class ValuationstatusData extends AbstractSeedClass {

    public ValuationstatusData(){
        addIdNameData(1, "Valid");
        addIdNameData(2, "Expired");

    }

}
