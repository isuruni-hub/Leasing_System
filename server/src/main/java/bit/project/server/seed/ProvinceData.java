package bit.project.server.seed;

import bit.project.server.util.seed.AbstractSeedClass;
import bit.project.server.util.seed.SeedClass;

import java.util.Hashtable;

@SeedClass
public class ProvinceData extends AbstractSeedClass {

    public ProvinceData(){
        addData(1,"WP" ,"Western Province");
        addData(2,"CP" ,"Central Province");
        addData(3,"SP" ,"Southern Province");
        addData(4,"UP" ,"Uva Province");
        addData(5,"SB" ,"Sabaragamuwa Province");
        addData(6,"NW" ,"North Western Province");
        addData(7,"NC" ,"North Central Province");
        addData(8,"NP" ,"Nothern Province");
        addData(9,"EP" ,"Eastern Province");


    }

    protected void addData(int id, String provincecode, String name){
        Hashtable<String, Object> t = new Hashtable();
        t.put("id", id);
        t.put("provincecode", provincecode);
        t.put("name", name);
        addData(t);
    }
}
