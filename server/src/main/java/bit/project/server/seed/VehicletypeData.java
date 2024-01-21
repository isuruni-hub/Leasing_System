package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

@SeedClass
public class VehicletypeData extends AbstractSeedClass {

    public VehicletypeData(){
        addIdNameData(1, "Dual Purpose");
        addIdNameData(2, "Motor Car");
        addIdNameData(3, "Three Wheeler Car");
        addIdNameData(4, "Motor Cycle");
        addIdNameData(5, "Motor Lorry");
    }

}
