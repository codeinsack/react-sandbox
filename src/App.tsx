import {
  AppBar,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
} from "@mui/material";

import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <Container style={{ paddingTop: "5rem" }}>
      <AppBar color="transparent">
        <Toolbar>
          <NavBar />
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={0} sm={1} md={3} lg={3} />
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <Card>
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={0} sm={1} md={3} lg={3} />
      </Grid>
    </Container>
  );
}

export default App;
