import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", name: "All" },
          { value: "checked-out", name: "Checked out" },
          { value: "checked-in", name: "Checked in" },
          { value: "unconfirmed", name: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "start_date-desc", name: "Sort by date (recent first)" },
          { value: "start_date-asc", name: "Sort by date (earlier first)" },
          {
            value: "price_total-desc",
            name: "Sort by amount (high first)",
          },
          { value: "price_total-asc", name: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
