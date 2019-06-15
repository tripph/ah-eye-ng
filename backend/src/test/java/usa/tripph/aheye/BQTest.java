package usa.tripph.aheye;

import com.google.cloud.bigquery.BigQuery;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;

import static org.junit.jupiter.api.Assertions.*;

class BQTest {


  private BQ bq = new BQ();

  @Test
  void query() {
    bq.findItems("Murbs");
  }
}
