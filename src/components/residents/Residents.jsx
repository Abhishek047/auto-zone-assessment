import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
} from "@mui/material";
export const Residents = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Gender</TableCell>
                        <TableCell align='right'>Birth year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component='th' scope='row'>
                                {row.name}
                            </TableCell>
                            <TableCell align='right'>{row.gender}</TableCell>
                            <TableCell align='right'>{row.birth_year}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
