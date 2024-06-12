import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { useDB } from "./useActionsDB";
import Upload from "./Upload";
import { useAddModal } from "./useAddModal";
import { ActionData, ActionsDBContent } from "./Types";

const Actions = ["play video"];

type Props = {
  control: Control<ActionData, any>;
  handleClose: () => void;
  addAction: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<any>;
};

export default (props: Props) => {
  const { control, handleClose, addAction } = props;

  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Grid container direction={"row"}>
          <Grid item>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: "必須入力" },
              }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  {...field}
                  label="Action Name"
                  fullWidth
                  placeholder="Action Name"
                  error={errors.name ? true : false}
                  helperText={errors.name?.message as string}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name="action"
              control={control}
              defaultValue="play video"
              rules={{
                required: { value: true, message: "必須入力" },
              }}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={fieldState.invalid}
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel id="area-label">action</InputLabel>
                  <Select {...field} label="action">
                    {Actions.map((action, index) => {
                      return (
                        <MenuItem key={index} value={action}>
                          {action}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item>
            <Upload control={control} />
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
            <Button variant="contained" onClick={addAction}>
              add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
