package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class CustomersubtypeData extends AbstractSeedClass {

    public CustomersubtypeData(){
        addIdNameData(1, "Client");
        addIdNameData(2, "Guarantor");
        addIdNameData(3, "Co-Applicant");

    }

}
