package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class CountryData extends AbstractSeedClass {

    public CountryData(){
        addIdNameData(1, "Sri Lanka");
        addIdNameData(2, "India");
        addIdNameData(3, "Japan");
        addIdNameData(4, "China");
        addIdNameData(5, "Thailand");
    }

}
