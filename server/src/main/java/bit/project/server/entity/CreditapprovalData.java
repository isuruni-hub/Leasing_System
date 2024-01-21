package bit.project.server.entity;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class CreditapprovalData extends AbstractSeedClass {

    public CreditapprovalData() {
        addIdNameData(1, "Active");
        addIdNameData(2, "Reject");
    }


}
