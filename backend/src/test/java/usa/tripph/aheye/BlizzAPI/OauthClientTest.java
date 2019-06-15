package usa.tripph.aheye.BlizzAPI;

import org.junit.jupiter.api.Test;

class OauthClientTest {
  private OauthClient oauthClient = new OauthClient();

  @Test
  void getAccessToken() {
    System.out.println(oauthClient.getAccessToken());
    System.out.println("fetching again");
    System.out.println(oauthClient.getAccessToken());
  }
}
