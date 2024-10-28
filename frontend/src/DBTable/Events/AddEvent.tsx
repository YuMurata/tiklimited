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
import { memo, useEffect, useMemo, useState } from "react";
// import Select from "react-select/dist/declarations/src/Select";

type Triggers = {
  gift: string;
};

// type Gift = {
//   id: number;
//   name: string;
//   diamond: number;
//   iconUrl: string;
// };

// const GiftIcon = memo(({ gift }: { gift: Gift }) => (
//   <div>
//     <img
//       src={gift.iconUrl}
//       alt={gift.name}
//       width={40}
//       height={40}
//       referrerPolicy="no-referrer"
//     />

//     <div>{gift.name}</div>
//   </div>
// ));

// type SelectTriggerProps = {
//   gift: Gift | null;
//   setGift: (gift: Gift | null) => void;
// };

// type SelectTriggerOption = {
//   label: string;
//   value: number;
//   name: string;
//   diamond: number;
//   iconUrl: string;
// };

// const toOption = (gift: Gift): SelectTriggerOption => {
//   return {
//     label: gift.name,
//     value: gift.id,
//     name: gift.name,
//     diamond: gift.diamond,
//     iconUrl: gift.iconUrl,
//   };
// };

// const toGift = (option: SelectTriggerOption | null): Gift | null => {
//   if (!option) {
//     return null;
//   }

//   return {
//     id: option.value,
//     name: option.name,
//     diamond: option.diamond,
//     iconUrl: option.iconUrl,
//   };
// };

// const SelectTrigger: React.FC<SelectTriggerProps> = ({ gift, setGift }) => {
//   const [gifts, setGifts] = useState<Gift[]>([]);

//   useEffect(() => {
//     (async () => {
//       const url = "/tiktok/available-gifts";
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const json = await response.json();
//       console.log(json);
//       setGiftNames(json.giftNames.slice(0, 5));
//     })();
//   }, []);

//   const onChange = (newGiftOption: SelectTriggerOption | null) => {
//     const newGift = toGift(newGiftOption);
//     setGift(newGift);
//   };

//   const value = useMemo(() => {
//     return gift ? toOption(gift) : null;
//   }, [gift]);

//   return (
//     <Select
//       instanceId="SelectTrigger"
//       value={value}
//       onChange={onChange}
//       options={gifts.map(toOption)}
//       inputValue=""
//       onInputChange={() => {}}
//       onMenuOpen={() => {}}
//       onMenuClose={() => {}}
//     />
//   );
// };

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
