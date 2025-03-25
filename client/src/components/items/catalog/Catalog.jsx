import { Link } from "react-router-dom";
import Loader from "../../main/loader/Loader.jsx";
import Search from "./Search.jsx";  // Импортиране на компонента за търсене
import './Catalog.css'
import { usePhones } from "../../../hook-api/UsePhones.js";
import PhoneTemplate from "../phone-template/PhoneTemplate.jsx";

export default function Catalog() {
    const { filteredProducts, handleSearch, handlePriceFilter } = usePhones();

    return (
        <div className="products-container">
            <h2 className="products-title">BROWSE FROM ALL OF THE PHONES ON OUR SITE</h2>
            <Search onSearch={handleSearch} onPriceFilter={handlePriceFilter} />  {/* Добавяме Search компонента */}

            <div className="products-grid">
                {filteredProducts.length > 0 ?
                    filteredProducts.map((item) => <PhoneTemplate phone={item} key={item._id} />) : <Loader />}
            </div>
        </div>
    );
}
