import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations(){
    return (
        <TableOperations>
            <Filter filterField="discount" options={[
                {value: "all", name: "All"},
                {value: "no-discount", name: "No Discount"},
                {value: "with-discount", name: "With Discount"}
            ]}></Filter>
            <SortBy options={[
                {value:'name-asc', name:'Sort by name (A-Z)',},
                {value:'name-desc', name:'Sort by name (Z-A)',},
                {value:'base_price-asc', name:'Sort by price (lowest first)',},
                {value:'base_price-desc', name:'Sort by price (highest first)',},
                {value:'num_Bedrooms-asc', name:'Sort by capacity (lowest first)',},
                {value:'num_Bedrooms-desc', name:'Sort by capacity (highest first)',},
            ]}></SortBy>
        </TableOperations>
    )
    
}