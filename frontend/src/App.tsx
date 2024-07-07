import * as React from "react";
import EventDBTable from "./DBTable/Events/EventDBTable";
import ActionDBTable from "./DBTable/Actions/ActionDBTable";
import Export from "./DBTable/Export/Export";
import { Tiktok } from "./Tiktok/Tiktok";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import Modal from "react-modal";

const App: React.FC = () => {
  Modal.setAppElement("#root");
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      spacing={2}
    >
      <Grid item>
        <Typography variant="h3">TikLimited</Typography>
      </Grid>

      <Grid item>
        <Grid
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"row"}
          spacing={2}
        >
          <Grid item>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              direction={"column"}
              spacing={2}
            >
              <Grid item>
                <ActionDBTable />
              </Grid>

              <Grid item>
                <EventDBTable />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              direction={"column"}
              spacing={2}
            >
              <Grid item>
                <Tiktok />
              </Grid>

              <Grid item>
                <Export />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default App;
