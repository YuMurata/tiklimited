import * as React from "react";
import EventDBTable from "../DBTable/Events/EventDBTable";
import ActionDBTable from "../DBTable/Actions/ActionDBTable";
import CreateDB from "../DBTable/Events/CreateDB";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useTiktokForm } from "./useTiktokForm";
import Stack from "@mui/material/Stack";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";

export const Tiktok: React.FC = () => {
  const { control, onConnect, onDisConnect, isConnected, isConnecting } =
    useTiktokForm();

  const ConnectIcon = () => {
    if (isConnecting) {
      return <CircularProgress size={20} />;
    }
    if (isConnected) {
      return <OnlinePredictionIcon color="success" fontSize="large" />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container direction={"column"} spacing={2} columnSpacing={2}>
        <Grid item>
          <Controller
            name="tiktokID"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "必須入力" },
            }}
            render={({ field, formState: { errors } }) => (
              <TextField
                {...field}
                label="tiktok ID"
                fullWidth
                placeholder="your tiktok ID"
                error={errors.tiktokID ? true : false}
                helperText={errors.tiktokID?.message as string}
              />
            )}
          />
        </Grid>

        <Grid item>
          <Grid container direction={"column"}>
            <Grid item>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={4}>
                  <Button
                    onClick={onConnect}
                    variant="contained"
                    fullWidth={true}
                  >
                    connect
                  </Button>
                </Grid>

                <Grid item xs={8}>
                  {ConnectIcon()}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={onDisConnect}
                variant="contained"
                fullWidth={true}
                color="error"
              >
                disconnect
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
