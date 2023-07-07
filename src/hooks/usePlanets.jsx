import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const defaultUrl = { next: "https://swapi.dev/api/planets/" };

export const usePlanets = ({ loadMore, setLoadMore }) => {
    const [response, setResponse] = useState(defaultUrl);
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reset, setReset] = useState(false);

    const resetResult = () => {
        setReset(true);
    };

    const getPlanets = useCallback(async () => {
        if (response && response.next) {
            try {
                setLoading(true);
                const url = response.next;
                const { data } = await axios.get(url);
                setResponse(data);
                setPlanets((prevState) => [...prevState, ...data.results]);
                setLoading(false);
                setLoadMore(false);
            } catch (error) {
                setLoadMore(false);
            }
        }
    }, [response, setLoadMore]);

    useEffect(() => {
        if (loadMore) {
            getPlanets();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadMore]);

    useEffect(() => {
        if (!loading) {
            if (reset) {
                setPlanets([]);
                setResponse(defaultUrl);
                setReset(false);
            }
        }
    }, [loading, reset]);

    return { loading, planets, resetResult };
};
