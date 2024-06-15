import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { AddModalProps } from "./useAddModal";
import { useActionDB } from "../Actions/useActionsDB";

type Triggers = {
  gift: string;
};

const gifts = ["Rose", "Heart", "Coffe", "Heart Me"];

export default (props: AddModalProps) => {
  const { control, handleClose, addEvent } = props;

  const { dbContents } = useActionDB();

  return (
    <Grid container direction={"column"}>
      <Grid item>
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
                <FormControl
                  fullWidth
                  error={fieldState.invalid}
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel id="area-label">trigger</InputLabel>
                  <Select {...field} label="trigger">
                    {gifts.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
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
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={fieldState.invalid}
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel id="area-label">trigger</InputLabel>
                  <Select {...field} label="action">
                    {dbContents?.map((value) => (
                      <MenuItem key={value.name} value={value.name}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction={"row"} justifyContent={"right"}>
          <Grid item>
            <Button variant="outlined" onClick={handleClose}>
              cancel
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={addEvent}>
              add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
