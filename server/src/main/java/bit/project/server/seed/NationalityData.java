package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class NationalityData extends AbstractSeedClass {

    public NationalityData(){
        addIdNameData(1, "Sri Lanka");
        addIdNameData(2, "India");

    }

}
