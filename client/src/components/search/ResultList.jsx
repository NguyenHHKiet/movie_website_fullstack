import MovieItem from "../movies/MovieItem";

const ResultList = ({
    result,
    isLoading,
    error,
    onShowDetail,
    setMovieDetail,
}) => {
    let content;

    if (error) {
        return error;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    if (result?.results.length > 0) {
        content = (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                }}>
                {result.results.map((item) => (
                    <MovieItem
                        key={item.id}
                        movie={item}
                        frame={0}
                        onShowDetail={onShowDetail}
                        setMovieDetail={setMovieDetail}
                    />
                ))}
            </div>
        );
    } else {
        content = "No Found Movies";
    }

    return <div>{content}</div>;
};

export default ResultList;
