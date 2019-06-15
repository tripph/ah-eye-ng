package usa.tripph.aheye;

import com.google.cloud.bigquery.*;
import usa.tripph.aheye.domain.UserItemListingRow;

import java.util.LinkedList;
import java.util.List;

public class BQ {
  BigQuery bigQuery = BigQueryOptions.getDefaultInstance().getService();



  public void query() {
    String q = "SELECT COUNT(*) FROM `ah-eye-242301.auctions.auctionsnow`";
    QueryJobConfiguration queryJobConfiguration = QueryJobConfiguration.newBuilder(q).build();
    try {
      for(FieldValueList row: bigQuery.query(queryJobConfiguration).iterateAll()) {
        for (FieldValue val : row) {
          System.out.printf("%s,", val.toString());
        }
        System.out.printf("\n");
      }
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }
  public List<UserItemListingRow> findItems(String user) {
    QueryJobConfiguration queryConfig = QueryJobConfiguration.newBuilder("\n" +
      "SELECT CONCAT(A.owner, ' - ', A.ownerRealm), A.bid/10000, A.buyout/10000,I.name, C.name AS ClassName  FROM `ah-eye-242301.auctions.auctionsnow_20190615` A\n" +
      "JOIN `items.items2` I ON A.item=I.id\n" +
      "JOIN `items.classes` C ON C.class = I.itemClass\n" +
      "WHERE owner LIKE @user")
      .setUseLegacySql(false)
      .addNamedParameter("user", QueryParameterValue.string(user))
      .build();
    List<UserItemListingRow> results = new LinkedList<>();
    try {
      for(FieldValueList row: bigQuery.query(queryConfig).iterateAll()) {
        results.add(new UserItemListingRow(row));
      }
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return results;
  }

}
