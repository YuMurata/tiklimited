import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useSharedActionsDB } from "../Actions/sharedContext";
import { AddModalProps } from "./useAddModal";

export default (props: AddModalProps) => {
  const { control, handleClose, addEvent } = props;

  const { dbContents } = useSharedActionsDB();

  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Grid container direction={"row"} spacing={4}>
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
                  label="Group Name"
                  fullWidth
                  placeholder="Group Name"
                  error={errors.name ? true : false}
                  helperText={errors.name?.message as string}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name="is_random"
              control={control}
              defaultValue={true}
              render={({ field, formState: { errors } }) => (
                <FormGroup {...field}>
                  <FormLabel component="legend">ランダム</FormLabel>
                  <FormControlLabel
                    control={<Checkbox name="check" />}
                    label="ランダム化"
                    value={field.value}
                  />                  
                </FormGroup>
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
