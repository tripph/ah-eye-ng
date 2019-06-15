package usa.tripph.aheye.BlizzAPI;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import usa.tripph.aheye.BlizzAPI.realms.RealmsIndexResponse;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@RegisterRestClient
public interface BlizzAPIService {
  @GET
  @Path("/data/wow/realm/index")
  @Produces("application/json")
  public RealmsIndexResponse getRealms(@QueryParam("access_token") String access_token,
                                       @QueryParam("namespace") String namespace,
                                       @QueryParam("locale") String locale);
}
