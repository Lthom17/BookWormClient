import { useCallback, useEffect, useState } from "react";

function useFetch (query, page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    let url = ''

    const sendQuery = useCallback(async () =>{
        try {
            await setLoading(true);
            await setError(false);
            if(page > 0){
                url = `http://openlibrary.org/search.json?q=${query}&page=${page}`;
            } else {
                url = `http://openlibrary.org/search.json?q=${query}`;
            }

            await fetch(url)
                .then(response => response.json())

                .then(data => {
                    // If there is new data, append it to current data
                    if(data.docs.length > 0 ){
                        setResults((current) => [...current, ...data.docs])
                    } else { //No data left to load. stop loading from appearing
                        setLoading(false);
                    }
                })
        } catch (err) {
            setError(err);
        }
    }, [query, page])

    useEffect(() => {
        sendQuery(query);
    }, [query, sendQuery, page]);

    return { loading, error, results };
}

export default useFetch