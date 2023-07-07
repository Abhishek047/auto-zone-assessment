import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { usePlanets } from "../../hooks/usePlanets";
import { useState } from "react";

export const Search = ({ setValue = (option) => console.log(option) }) => {
    const [open, setOpen] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const { loading, planets, resetResult } = usePlanets({ loadMore, setLoadMore });

    const handleScroll = ({ currentTarget }) => {
        const scrollPosition = currentTarget.scrollTop + currentTarget.clientHeight;
        if (currentTarget.scrollHeight - scrollPosition <= 20) {
            setLoadMore(true);
        }
    };
    const handlePlanet = (option) => {
        setValue(option);
    };

    return (
        <Box>
            <Autocomplete
                id='search-box-demo'
                onOpen={() => {
                    setOpen(true);
                    setLoadMore(true);
                }}
                onClose={() => {
                    resetResult();
                    setOpen(false);
                }}
                onChange={(_, option) => handlePlanet(option)}
                options={planets}
                loading={loading}
                loadingText={"Loading..."}
                ListboxProps={{
                    onScroll: handleScroll,
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Planets'
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading && open ? <CircularProgress size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </Box>
    );
};
