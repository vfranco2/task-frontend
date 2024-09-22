import {
  Button,
  DataOverlay,
  Dialog,
  DialogContent,
  DialogTrigger,
  Flex,
  Heading,
  Separator,
  Text,
  Toast,
} from "@tycholabs/armillary";
import React, { useEffect, useState } from "react";
import { GetAllTasks } from "../../hooks/tasks";
import { Task } from "../../constants/Types";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { endpoint } from "../../constants/Endpoints";

export default function Main() {
  const tasksResponse = GetAllTasks();
  //@ts-expect-error
  const tasksData: Partial<Task>[] = tasksResponse?.data?.tasks;

  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("Saved!");

  const [taskToEdit, setTaskToEdit] = useState<Partial<Task> | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Partial<Task> | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${endpoint}/refresh`);
    try {
      ws.onopen = () => {
        console.log("Opened connection!");
      };
      ws.onclose = function () {
        console.log("Closed connection!");
      };
      ws.onerror = function () {
        console.log("Connection error detected!");
      };
      ws.onmessage = () => {
        tasksResponse.refetch();
      };
    } catch {
      console.log("Failed to connect to TaskTracker");
    }
  }, []);

  return (
    <Flex direction="column" gap="30px">
      <Flex direction="column" gap="8px">
        <Heading>Tasks</Heading>
        <Text color="secondary" size="medium">
          View active and completed tasks here
        </Text>
      </Flex>
      <Dialog open={addTaskModalOpen} onOpenChange={setAddTaskModalOpen}>
        <DialogTrigger asChild>
          <Button type="primary">
            <Plus />
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent onPointerDownOutside={(e: any) => e.preventDefault()}>
          <AddTaskModal
            setModalOpen={setAddTaskModalOpen}
            setToastVisible={setToastVisible}
            setToastText={setToastText}
            queryRefetch={tasksResponse.refetch}
          />
        </DialogContent>
      </Dialog>

      <Flex direction="column" gap="8px">
        <DataOverlay
          loading={tasksResponse.isLoading}
          error={tasksResponse.isError}
          exists={tasksData && tasksData.length > 0}
          title="No tasks found!"
        >
          {console.log(tasksData)}
          <Heading size="xSmall">To do</Heading>
          {tasksData &&
            tasksData.length > 0 &&
            tasksData
              .sort((a, b) => {
                return b.updated.valueOf() - a.updated.valueOf();
              })
              .filter((task) => !task.checked)
              .map((task) => (
                <TaskCard
                  task={task}
                  setTaskToEdit={setTaskToEdit}
                  setTaskToDelete={setTaskToDelete}
                  setEditTaskModalOpen={setEditTaskModalOpen}
                  setDeleteTaskModalOpen={setDeleteTaskModalOpen}
                  setToastVisible={setToastVisible}
                  setToastText={setToastText}
                  queryRefetch={tasksResponse.refetch}
                />
              ))}

          {tasksData && tasksData.length > 0 && (
            <>
              <Separator />
              <Heading size="xSmall">Completed</Heading>
              {tasksData
                .sort((a, b) => {
                  return b.updated.valueOf() - a.updated.valueOf();
                })
                .filter((task) => task.checked)
                .map((task) => (
                  <TaskCard
                    task={task}
                    setTaskToEdit={setTaskToEdit}
                    setTaskToDelete={setTaskToDelete}
                    setEditTaskModalOpen={setEditTaskModalOpen}
                    setDeleteTaskModalOpen={setDeleteTaskModalOpen}
                    setToastVisible={setToastVisible}
                    setToastText={setToastText}
                    queryRefetch={tasksResponse.refetch}
                  />
                ))}
            </>
          )}
        </DataOverlay>
      </Flex>
      <Dialog open={editTaskModalOpen} onOpenChange={setEditTaskModalOpen}>
        <DialogContent onPointerDownOutside={(e: any) => e.preventDefault()}>
          <EditTaskModal
            setModalOpen={setEditTaskModalOpen}
            setToastVisible={setToastVisible}
            setToastText={setToastText}
            queryRefetch={tasksResponse.refetch}
            task={taskToEdit}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={deleteTaskModalOpen} onOpenChange={setDeleteTaskModalOpen}>
        <DialogContent onPointerDownOutside={(e: any) => e.preventDefault()}>
          <DeleteTaskModal
            setModalOpen={setDeleteTaskModalOpen}
            setToastVisible={setToastVisible}
            setToastText={setToastText}
            queryRefetch={tasksResponse.refetch}
            task={taskToDelete}
          />
        </DialogContent>
      </Dialog>
      <Toast title={toastText} open={toastVisible} />
    </Flex>
  );
}
