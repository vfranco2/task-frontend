import {
  Button,
  DataOverlay,
  Dialog,
  DialogContent,
  DialogTrigger,
  Flex,
  Heading,
  Text,
  Toast,
} from "@tycholabs/armillary";
import React, { useState } from "react";
import { GetAllTasks } from "../../hooks/tasks";
import { Task } from "../../constants/Types";
import TicketCard from "./TicketCard";
import { Plus } from "lucide-react";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

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

  return (
    <Flex direction="column" gap="30px">
      <Flex direction="column" gap="8px">
        <Heading>Tickets</Heading>
        <Text color="secondary" size="medium">
          View active and completed tickets here
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
          title="No tickets found!"
        >
          {tasksData &&
            tasksData.length > 0 &&
            tasksData.map((task) => (
              <TicketCard
                task={task}
                setTaskToEdit={setTaskToEdit}
                setTaskToDelete={setTaskToDelete}
                setEditTaskModalOpen={setEditTaskModalOpen}
                setDeleteTaskModalOpen={setDeleteTaskModalOpen}
              />
            ))}
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
