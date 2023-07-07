import { useEffect, useState } from "react";
import { useResidentOptions } from "../../store/residentsContext";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { Residents } from "./Residents";

export const ResidentList = ({ residents, id }) => {
    const { getResidents, loading } = useResidentOptions();
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            const fetched = await getResidents(id, page, 10, residents);
            console.log("call");
            setPeople(fetched.map((val) => val.value));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, page]);

    return (
        <Box>
            {loading ? (
                <Box
                    sx={{
                        display: "grid",
                        height: "50vh",
                        placeItems: "center",
                    }}>
                    <CircularProgress />
                </Box>
            ) : id ? (
                <Box my={2}>
                    <Residents data={people} />
                    <Box
                        mt={2}
                        sx={{
                            display: "grid",
                            placeItems: "center",
                        }}>
                        <Pagination
                            count={Math.ceil(residents.length / 10)}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                        />
                    </Box>
                </Box>
            ) : (
                ""
            )}
        </Box>
    );
};
