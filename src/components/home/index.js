import { Box, Typography } from "@mui/material";
import { Search } from "../search/Search";
import { useMemo, useState } from "react";
import { ResidentList } from "../residents/ResidentList";

export const Home = () => {
    const [value, setValue] = useState(null);
    const id = useMemo(() => {
        if (value) {
            const split = value.url.split("/");
            return split[split.length - 2];
        } else {
            return null;
        }
    }, [value]);

    return (
        <Box>
            <Search setValue={setValue} />
            <Typography variant='h1' gutterBottom>
                {value ? value.name : "Home"}
            </Typography>
            {value ? (
                <ResidentList residents={value.residents} id={id} />
            ) : (
                <Typography variant='h6'>Please select a planet</Typography>
            )}
        </Box>
    );
};
