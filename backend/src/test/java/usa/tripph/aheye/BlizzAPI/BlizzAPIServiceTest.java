package usa.tripph.aheye.BlizzAPI;

import io.quarkus.test.junit.QuarkusTest;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

@QuarkusTest
class BlizzAPIServiceTest {
  @Inject
  private OauthClient oauthClient;

  @Inject
  @RestClient
  BlizzAPIService blizzAPIService;

  @Test
  void getRealms() {
    assertNotEquals("", blizzAPIService.getRealms(oauthClient.getAccessToken(), "dynamic-us", "en_US").realms.get(0).name);
  }
}
