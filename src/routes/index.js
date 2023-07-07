import { Routes as Switch, Route } from "react-router-dom";
import * as routeDefinitions from "./routeDefinitions";
import { Navbar } from "../components/navbar/Navbar";
import { Container } from "@mui/material";
import { ResidentProvider } from "../store/residentsContext";

const routes = Object.values(routeDefinitions);

const Routes = () => {
    return (
        <div>
            <Navbar />
            <Container maxWidth='xl'>
                <ResidentProvider>
                    <Switch>
                        {routes.map((route) => {
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<route.Component />}
                                />
                            );
                        })}
                    </Switch>
                </ResidentProvider>
            </Container>
        </div>
    );
};

export default Routes;
