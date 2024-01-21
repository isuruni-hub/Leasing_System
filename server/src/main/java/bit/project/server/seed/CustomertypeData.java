package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class CustomertypeData extends AbstractSeedClass {

    public CustomertypeData(){
        addIdNameData(1, "Individual");
        addIdNameData(2, "Company");

    }

}
