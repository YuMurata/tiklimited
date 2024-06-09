import * as React from "react";
import EventDBTable from "../DBTable/Events/EventDBTable";
import ActionDBTable from "../DBTable/Actions/ActionDBTable";
import CreateDB from "../DBTable/Events/CreateDB";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useTiktokForm } from "./useTiktokForm";
import Stack from "@mui/material/Stack";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";

export const Tiktok: React.FC = () => {
  const { control, onConnect, onDisConnect, isConnected, isConnecting } =
    useTiktokForm();

  return (
    <div>
      <Stack direction="row">
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
        {isConnecting && <CircularProgress />}
        {isConnected && (
          <OnlinePredictionIcon color="success" fontSize="large" />
        )}        
      </Stack>
      <div>
        <Box textAlign={"right"}>
          <Button onClick={onConnect} variant="contained" fullWidth={true}>
            connect
          </Button>
        </Box>
        <Box textAlign={"right"}>
          <Button
            onClick={onDisConnect}
            variant="contained"
            fullWidth={true}
            color="secondary"
          >
            disconnect
          </Button>
        </Box>
      </div>
    </div>
  );
};
