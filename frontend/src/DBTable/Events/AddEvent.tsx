import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useDB } from "./useEventsDB";

type Triggers = {
  gift: string;
};

export default (props: any) => {
  const { control } = useDB();
  return (
    <Grid container direction={"row"}>
      <Grid item>
        <Controller
          name="trigger"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "必須入力" },
          }}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={fieldState.invalid} sx={{minWidth: 120}}>
              <InputLabel id="area-label">trigger</InputLabel>
              <Select {...field} label="trigger">
                <MenuItem value={40}>rose</MenuItem>
              </Select>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name="action"
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
              error={errors.trigger ? true : false}
              helperText={errors.trigger?.message as string}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
