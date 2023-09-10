import { useState } from "react";

import classes from "./SearchForm.module.scss";
import { hosting, requests } from "../../utils/API";

const SearchForm = ({
    setResult,
    sendRequest,
    genre,
    mediaType,
    language,
    year,
}) => {
    const [enteredSearch, setEnteredSearch] = useState("");

    const searchHandler = (event) => {
        event.preventDefault();
        // Remove leading and trailing spaces in JavaScript strings

        sendRequest(
            {
                url: `${hosting}${requests.fetchSearch}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "8qlOkxz4wq",
                },
                body: {
                    keyword: enteredSearch,
                    genre_ids: genre.value,
                    media_type: mediaType.value,
                    original_language: language.value,
                    release_date: year.value,
                },
            },
            setResult
        );
    };

    const resetSearch = () => setEnteredSearch("");

    const onChangeHandler = (e) => setEnteredSearch(e.target.value.trim());

    // check-in search tool is available
    const checkInput = (search) => (search.trim().length === 0 ? true : false);
    // styled button
    const styled = checkInput(enteredSearch) ? classes.invalid : classes.valid;

    return (
        <div className={classes.showcase}>
            <form className={classes.form} onSubmit={searchHandler}>
                <input
                    type="search"
                    name="search"
                    placeholder="Search"
                    value={enteredSearch}
                    onChange={onChangeHandler}
                />
                <div className={classes.button}>
                    <button
                        type="button"
                        onClick={resetSearch}
                        style={{ cursor: "pointer" }}>
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={checkInput(enteredSearch)}
                        className={styled}>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
