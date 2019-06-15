package usa.tripph.aheye;

import usa.tripph.aheye.BlizzAPI.realms.Realm;
import usa.tripph.aheye.BlizzAPI.realms.RealmService;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;

@Resource
@Path("/api/v1/realm-list")
public class RealmsResource {


  @Inject
  private RealmService realmService;

  @GET
  @Produces("application/json")
  public List<Realm> realms() {
    return realmService.getRealms();
  }

}
