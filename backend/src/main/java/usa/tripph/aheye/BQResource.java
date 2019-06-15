package usa.tripph.aheye;

import usa.tripph.aheye.domain.UserItemListingRow;

import javax.annotation.Resource;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/v1/query")
@Resource
@Produces(MediaType.APPLICATION_JSON)
public class BQResource {
  BQ bq = new BQ();
  @GET
  @Path("/items")
  public List<UserItemListingRow> query(@QueryParam("user") String user) {
    return bq.findItems(user);
//    return user;
  }
}
