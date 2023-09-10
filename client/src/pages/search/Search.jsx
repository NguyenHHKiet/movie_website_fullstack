import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import Navbar from "../../components/navbar/Navbar";
import SearchForm from "../../components/search/SearchForm";
import ResultList from "../../components/search/ResultList";
import MovieDetail from "../../components/movies/MovieDetail";

import { hosting, requests } from "../../utils/API";
import useHTTP from "../../hooks/use-http";

const Search = () => {
    const [data, setData] = useState();
    const [genre, setGenre] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [language, setLanguage] = useState("");
    const [year, setYear] = useState("");

    const [result, setResult] = useState(null);
    const { error, isLoading, sendRequest } = useHTTP();

    // show popup details
    const [detail, setDetail] = useState(null);
    const [popUp, setPopUp] = useState(false);

    // selected properties array
    const optionsGenre = data?.genre.map((item) => {
        return { value: item.id, label: item.name };
    });
    const optionsMediaType = data?.mediaType.map((item) => {
        return { value: item, label: item };
    });
    const optionsLanguage = [
        { value: "en", label: "English" },
        { value: "ja", label: "Japan" },
        { value: "ko", label: "Korean" },
    ];
    const optionsYear = [
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
        { value: "2021", label: "2021" },
        { value: "2020", label: "2020" },
        { value: "2019", label: "2019" },
        { value: "2018", label: "2018" },
    ];

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            width: "10rem",
        }),
        option: (styles) => {
            return {
                ...styles,
                backgroundColor: "white",
                color: "black",
                cursor: "pointer",
            };
        },
    };

    useEffect(() => {
        fetch(`${hosting}${requests.fetchSearch}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: "8qlOkxz4wq",
            },
        })
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    // show and hide about description detail
    const showPopUpHandler = () => setPopUp(true);
    const hidePopUpHandler = () => setPopUp(false);

    return (
        <Fragment>
            {popUp && <MovieDetail movie={detail} onClose={hidePopUpHandler} />}
            <Navbar />
            <div className="app relative top-20">
                <SearchForm
                    setResult={setResult}
                    sendRequest={sendRequest}
                    genre={genre}
                    mediaType={mediaType}
                    language={language}
                    year={year}
                />
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "0.5rem",
                    }}>
                    <Select
                        placeholder="Genre"
                        value={genre}
                        onChange={(value) => setGenre(value)}
                        options={optionsGenre}
                        styles={colourStyles}
                    />
                    <Select
                        placeholder="Media Type"
                        value={mediaType}
                        onChange={(value) => setMediaType(value)}
                        options={optionsMediaType}
                        styles={colourStyles}
                    />
                    <Select
                        placeholder="Language"
                        value={language}
                        onChange={(value) => setLanguage(value)}
                        options={optionsLanguage}
                        styles={colourStyles}
                    />
                    <Select
                        placeholder="Year"
                        value={year}
                        onChange={(value) => setYear(value)}
                        options={optionsYear}
                        styles={colourStyles}
                    />
                </div>

                <h2 className="py-2">Result List</h2>
                <ResultList
                    result={result}
                    isLoading={isLoading}
                    error={error}
                    onShowDetail={showPopUpHandler}
                    setMovieDetail={setDetail}
                />
            </div>
        </Fragment>
    );
};

export default Search;
