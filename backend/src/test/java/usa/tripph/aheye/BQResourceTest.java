package usa.tripph.aheye;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;
@QuarkusTest
class BQResourceTest {

  @Test
  void query() {
    given()
      .when()
      .given().get("/api/v1/query/items?user=test")
      .then()
      .statusCode(200);
  }
}
