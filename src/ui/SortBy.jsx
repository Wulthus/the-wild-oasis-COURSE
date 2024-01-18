import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }){

    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || '';

    function handleSelect(e){
        searchParams.set('sortBy', e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <Select value={sortBy} options={options} type="white" onChange={handleSelect}></Select>
    )
    
}