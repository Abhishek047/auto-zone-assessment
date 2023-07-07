import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"

export const Navbar = () => {
  return (
    <Box mb={2}>
        <AppBar position="static">
            <Toolbar>
              <Container maxWidth='xl'>
                <Typography variant="h6">
                    Star-bay
                </Typography>
              </Container>
            </Toolbar>
        </AppBar>
    </Box>
  )
}
