import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2.5),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const status = [
  {
    value: "Completed",
    label: "Completed",
  },
  {
    value: "On Going",
    label: "On Going",
  },
];

export default function CustomDialog({
  buttonName,
  preFilledData = {},
  modifiedTask,
  id,
}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    title: preFilledData.title || "",
    description: preFilledData.description || "",
    status: preFilledData.status || "On Going",
  });

  const handleClickOpen = () => {
    setData({
      title: preFilledData.title || "",
      description: preFilledData.description || "",
      status: preFilledData.status || "On Going",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData({
      title: "",
      description: "",
      status: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitAction = () => {
    const url = id
      ? `http://127.0.0.1:8000/api/v1/todo/updateTodo`
      : `http://127.0.0.1:8000/api/v1/todo/addTodo`;

    const method = id ? "POST" : "POST"; // This can be adjusted based on your backend requirements

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        modifiedTask();
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 4,
            top: 4,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="w-[350px] mt-5 flex flex-col gap-4">
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            value={data.title}
            onChange={handleChange}
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows={3}
            value={data.description}
            onChange={handleChange}
          />
          <TextField
            id="status"
            name="status"
            select
            label="Status"
            value={data.status}
            onChange={handleChange}
            helperText="Please select the status of the task"
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={submitAction}>
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
