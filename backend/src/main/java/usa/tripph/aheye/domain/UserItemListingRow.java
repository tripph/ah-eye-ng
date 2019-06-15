package usa.tripph.aheye.domain;

import com.google.cloud.bigquery.FieldValueList;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class UserItemListingRow {
  public String owner;
  public Double bid;
  public Double buyout;
  public String item_name;
  public String category;
  public UserItemListingRow(FieldValueList row) {
    assert(row.size()==5);
    this.owner = row.get(0).getStringValue();
    this.bid = row.get(1).getDoubleValue();
    this.buyout = row.get(2).getDoubleValue();
    this.item_name = row.get(3).getStringValue();
    this.category = row.get(4).getStringValue();
  }
}
