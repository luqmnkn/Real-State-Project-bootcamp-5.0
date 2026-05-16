import './searchBar.scss';
import { useState } from 'react';


function SearchBar() {
    
    const types = ["buy", "rent"];
    const [query, setQuery] = useState({
            type: 'buy',
            location: '',
            minPrice: '',
            maxPrice: ''
    });

    const switchType = (val) => {
setQuery((prev) => ({...prev, type: val}));


    }
    return (
       <div className="searchBar">
        <div className="type">


        {types.map((type) => (
            <button
            className={query.type === type ? "active" : ""}
            key={type}
            onClick={() => switchType(type)}
          >
            {type}
          </button>
        ))}
        </div>


        <form action="">
            <input type="text" />
            <input type="number" />
            <input type="number" />

        <button>
            <img src="/search.png" alt="" />
        </button>

            </form>
       </div>
    );
}

export default SearchBar;