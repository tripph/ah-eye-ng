package usa.tripph.aheye.BlizzAPI;

import org.apache.http.HttpResponse;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.Json;
import javax.json.JsonReader;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collections;
import java.util.stream.Collectors;

@Singleton
public class OauthClient {
  CloseableHttpClient client = HttpClients.createDefault();
  HttpPost httpPost = new HttpPost("https://us.battle.net/oauth/token");
  @Inject
  @ConfigProperty(name = "blizz.api_key", defaultValue = "")
  private String api_key;
  @Inject
  @ConfigProperty(name = "blizz.api_secret", defaultValue = "")
  private String api_secret;

  public OauthClient() {


  }


  private String accessToken = null;
  private Timestamp lastRefresh;

  public String getAccessToken() {
    if (this.accessToken != null && this.lastRefresh != null && this.lastRefresh.before(Timestamp.from(Instant.now().plusSeconds(86399)))) {
      return this.accessToken;
    }
    System.out.println("Fetching new token");

    try {
      httpPost.setEntity(new UrlEncodedFormEntity(Collections.singletonList(new BasicNameValuePair("grant_type", "client_credentials"))));
      UsernamePasswordCredentials creds = new UsernamePasswordCredentials(this.api_key, this.api_secret);
      httpPost.addHeader(new BasicScheme().authenticate(creds, httpPost, null));
      HttpResponse resp = client.execute(httpPost);
      if (resp.getStatusLine().getStatusCode() == 200) {

        JsonReader jsonReader = Json.createReader(new StringReader(new BufferedReader(new InputStreamReader(resp.getEntity().getContent())).lines().collect(Collectors.joining("\n"))));
        this.accessToken = jsonReader.readObject().getString("access_token");
        this.lastRefresh = Timestamp.from(Instant.now());
      } else {
        System.out.println(resp.getStatusLine().getReasonPhrase());
        return null;
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
    return this.accessToken;
  }

}
