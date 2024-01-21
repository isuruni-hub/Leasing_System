package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class InsurancecompanystatusData extends AbstractSeedClass {

    public InsurancecompanystatusData(){
        addIdNameData(1, "Active");
        addIdNameData(2, "Deactive");

    }

}
