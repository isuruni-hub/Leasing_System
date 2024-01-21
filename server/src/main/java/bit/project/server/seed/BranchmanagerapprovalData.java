package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class BranchmanagerapprovalData extends AbstractSeedClass {

    public BranchmanagerapprovalData() {
        addIdNameData(1, "Active");
        addIdNameData(2, "Reject");
    }


}
