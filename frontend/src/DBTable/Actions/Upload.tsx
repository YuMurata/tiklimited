import { Box, Button, FormControl } from "@mui/material";
import { useRef, useState } from "react";
import { CloudUploadOutlined } from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";
import { Control, Controller, useForm } from "react-hook-form";
import { ActionData } from "./Types";
// import visual

type Props = {
  control: Control<ActionData, any>;
};

export default (props: Props) => {
  const inputRef = useRef();
  const [source, setSource] = useState();
  const [file, setFile] = useState<File | null>(null);

  //   const handleFileChange = (event) => {
  //     const file = event.target.files[0];
  //     const url = URL.createObjectURL(file);
  //     setFile(file);
  //     setSource(url);
  //   };

  //   const handleChoose = (event) => {
  //     inputRef.current.click();
  //   };

  const handleChangeFile = (newFile: File | null) => {
    if (newFile) {
      setFile(newFile);
    }
  };

  return (
    <Box>
      <Controller
        control={props.control}
        name="file"
        rules={{
          required: { value: true, message: "必須入力" },
        }}
        render={({ field, fieldState }) => (
          <FormControl
            fullWidth
            error={fieldState.invalid}
            sx={{ minWidth: 120 }}
          >
            <MuiFileInput
              {...field}
              helperText={fieldState.invalid ? "File is invalid" : ""}
              error={fieldState.invalid}
            />            
          </FormControl>
        )}
      />

      {/* {!source && <Button>動画を選択</Button>}
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height="400px"
          controls
          src={source}
        />
      )} */}
    </Box>
  );
};
