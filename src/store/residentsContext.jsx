import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";

const ResidentContext = createContext();

export const useResidentOptions = () => {
    return useContext(ResidentContext);
};

export const ResidentProvider = ({ children }) => {
    const [residents, setResidents] = useState({});
    const [loading, setLoading] = useState(false);

    const getResidents = useCallback(
        async (id, page, offset, allResident) => {
            const fetchResidents = async (residentsToFetch = []) => {
                const allFetchResidents = await Promise.allSettled(
                    residentsToFetch.map((url) => axios.get(url))
                );
                const response = allFetchResidents.map((result, index) => {
                    if (result.status === "fulfilled") {
                        return {
                            value: result.value.data,
                            success: true,
                        };
                    } else {
                        return {
                            value: allFetchResidents[index],
                            success: false,
                            ...result.value,
                        };
                    }
                });
                return response;
            };
            setLoading(true);
            const currentStart = (page - 1) * 10;
            const currentEnd =
                currentStart + offset >= allResident.length
                    ? allResident.length
                    : currentStart + offset;
            if (residents[`${id}`] && residents[`${id}`].residents.length >= currentEnd) {
                setLoading(false);
                return residents[`${id}`].residents.slice(currentStart, currentEnd);
            } else {
                const residentsToFetch = allResident.slice(currentStart, currentEnd);
                const fetchedResidents = await fetchResidents(residentsToFetch);
                const newResidents = residents[`${id}`]
                    ? [...residents[`${id}`].residents, ...fetchedResidents]
                    : fetchedResidents;
                setResidents({
                    ...residents,
                    [`${id}`]: {
                        residents: newResidents,
                    },
                });
                setLoading(false);
                return fetchedResidents;
            }
        },
        [residents]
    );

    return (
        <ResidentContext.Provider value={{ getResidents, loading }}>
            {children}
        </ResidentContext.Provider>
    );
};
