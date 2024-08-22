import React from "react";
import CustomDialog from "./CustomDialog";
import Button from "@mui/material/Button";

const deleteTodo = (id, onTaskModified) => {
  fetch(`http://127.0.0.1:8000/api/v1/todo/deleteTodo`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      alert("Successfully deleted");
      onTaskModified();
    } else {
      alert("Error in deleting");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
};

const Todo = ({ id, title, description, status,onTaskModified }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-md shadow-sm bg-blue-50">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex gap-2 text-sm">
        <CustomDialog
        id={id}
          modifiedTask={onTaskModified}
          buttonName={"Edit"}
          preFilledData={{ title: title, description: description, status }}
        />
        <Button variant="outlined" onClick={() => deleteTodo(id, onTaskModified)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Todo;
