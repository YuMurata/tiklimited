import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { AddModalProps } from "./useAddModal";
import { useSharedActionsDB } from "../Actions/sharedContext";
import { useSharedGroupsDB } from "../Groups/sharedContext";

type Triggers = {
  gift: string;
};

const gifts = [
  
];

export default (props: AddModalProps) => {
  const { control, handleClose, addEvent } = props;

  const actionDB = useSharedActionsDB().dbContents;
  const groupDB = useSharedGroupsDB().dbContents;

  const [gifts, setGifts] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const url = "/tiktok/available-gifts";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);
      setGifts(json.giftNames);
    })();
  }, []);

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
                  <InputLabel id="area-label">action</InputLabel>
                  <Select {...field} label="action">
                    {actionDB?.map((value) => (
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

          <Grid item>
            <Controller
              name="group_name"
              control={control}
              defaultValue={groupDB[0].name}
              rules={{
                required: { value: true, message: "必須入力" },
              }}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={fieldState.invalid}
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel id="area-label">group_name</InputLabel>
                  <Select {...field} label="group_name">
                    {groupDB?.map((value) => (
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
