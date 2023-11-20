import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "./Search.scss";
import HeadlessTippy from "@tippyjs/react/headless";

import { Link } from "react-router-dom";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  // const debounceValue = useDebounce(searchValue, 500);

  const searchFocus = useRef();

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      // const result = await searchServices.search(debounceValue);
      //   setSearchResult(result);
      setLoading(false);
    };

    fetchApi();
  }, []);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    searchFocus.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleClickSearch = () => {
    setSearchResult([]);
    setSearchValue("");
  };

  const handleChangeSearch = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFocus.current.blur();
  };

  return (
    // Using a wrapper <div> or <span> tag around the reference element solves
    //this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className="search-result" tabIndex="-1" {...attrs}>
            abc
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className="search">
          {searchResult.length > 0 ? (
            <Link to={`abc`}>
              <button className="search-btn" onMouseDown={handleSubmit}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </Link>
          ) : (
            <button className="search-btn" onMouseDown={handleSubmit}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          )}
          <input
            ref={searchFocus}
            value={searchValue}
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={handleChangeSearch}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className="clear" onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className="loading" icon={faSpinner} />}
        </div>
      </HeadlessTippy>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
