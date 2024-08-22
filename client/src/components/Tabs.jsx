import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Todo from "./Todo";
import CustomDialog from "./CustomDialog";

export default function CustomTabs() {
  const [value, setValue] = React.useState("All");
  const [todos, setTodos] = React.useState([]);
  const [fetchTrigger, setFetchTrigger] = React.useState(0);
  const [filteredArray, setFilteredArray] = React.useState([]);

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/todo/getTodos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.todos), setFilteredArray(data.todos);
      });
  }, [fetchTrigger]);

  const handleChange = (event, newValue) => {
    if (newValue == "All") {
      setFilteredArray(todos);
    } else {
      const data = todos.filter((todo) => todo.status == newValue);
      setFilteredArray(data);
    }

    setValue(newValue);
  };

  const handleTaskAddedOrDeleted = () => {
    setFetchTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="All" label="All" />
          <Tab value="Completed" label="Completed" />
          <Tab value="On Going" label="On Going" />
        </Tabs>
      </Box>
      <div className="m-3 grid grid-cols-2 gap-4">
        {filteredArray.map((TodoItem) => {
          return (
            <Todo
              key={TodoItem._id}
              id={TodoItem._id}
              title={TodoItem.title}
              status={TodoItem.status}
              description={TodoItem.description}
              onTaskModified={handleTaskAddedOrDeleted}
            />
          );
        })}
      </div>
      <div className="absolute bottom-5 right-5">
        <CustomDialog
          buttonName={"Add Task"}
          modifiedTask={handleTaskAddedOrDeleted}
        ></CustomDialog>
      </div>
    </div>
  );
}
