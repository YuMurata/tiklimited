import * as React from "react";
import EventDBTable from "./DBTable/Events/EventDBTable";
import { SharedEventsDBProvider } from "./DBTable/Events/sharedContext";
import ActionDBTable from "./DBTable/Actions/ActionDBTable";
import Export from "./DBTable/Export/Export";
import { Tiktok } from "./Tiktok/Tiktok";
import { Grid, Typography } from "@mui/material";
import Modal from "react-modal";
import { SharedActionsDBProvider } from "./DBTable/Actions/sharedContext";
import GroupDBTable from "./DBTable/Groups/GroupDBTable";
import { SharedGroupsDBProvider } from "./DBTable/Groups/sharedContext";

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
          <SharedActionsDBProvider>
            <SharedEventsDBProvider>
              <SharedGroupsDBProvider>
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

                    <Grid item>
                      <GroupDBTable />
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
              </SharedGroupsDBProvider>
            </SharedEventsDBProvider>
          </SharedActionsDBProvider>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default App;
