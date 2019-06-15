package usa.tripph.aheye.BlizzAPI.realms;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import usa.tripph.aheye.BlizzAPI.BlizzAPIService;
import usa.tripph.aheye.BlizzAPI.OauthClient;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class RealmService {
  @Inject
  private OauthClient oauthClient;

  @Inject
  @RestClient
  BlizzAPIService blizzAPIService;

  private List<Realm> realms = null;

  public List<Realm> getRealms() {
    //if first time requesting, fetch the list from blizz
    if (this.realms == null) {
      this.realms = this.blizzAPIService.getRealms(oauthClient.getAccessToken(), "dynamic-us", "en_US").realms;
    }
    return this.realms;
  }
}
