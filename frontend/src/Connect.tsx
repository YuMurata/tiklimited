import * as React from "react";
import EventDBTable from "./DBTable/Events/EventDBTable";
import ActionDBTable from "./DBTable/Actions/ActionDBTable";
import CreateDB from "./DBTable/Events/CreateDB";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";

type FormValues = {
  tiktokID: string;
};

const Connect = () => {
  const { control, handleSubmit } = useForm<FormValues>({});

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(JSON.stringify(data));
    const postConnect = async () => {
      const url = "/connect";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // レスポンスの確認
      if (!response.ok) {
        console.error("Error in user creation:", response);
        return;
      }
    };
    postConnect();
  };

  return (
    <div>
      <Box>
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
              label="text"
              fullWidth
              placeholder="012345678"
              error={errors.tiktokID ? true : false}
              helperText={errors.tiktokID?.message as string}
            />
          )}
        />
      </Box>
      <Box textAlign={"right"}>
        <Button onClick={handleSubmit(onSubmit)}>
          connect
        </Button>
      </Box>
      <Box textAlign={"right"}>
        <Button onClick={handleSubmit(onSubmit)}>
          disconnect
        </Button>
      </Box>

    </div>
  );
};

export default Connect;
