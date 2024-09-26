import { Flex, DialogHeader, Button, Text } from "@tycholabs/armillary";
import { Dispatch, SetStateAction, useState } from "react";
import { DeleteTask } from "../../hooks/tasks";
import { Task } from "../../constants/Types";

export interface EditTaskModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setToastVisible: Dispatch<SetStateAction<boolean>>;
  setToastText: Dispatch<SetStateAction<string>>;
  queryRefetch: any;
  task: Partial<Task>;
}

export const DeleteTaskModal = ({
  setModalOpen,
  setToastVisible,
  setToastText,
  queryRefetch,
  task,
}: EditTaskModalProps) => {
  const deleteTask = DeleteTask(task.id);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmitButtonClick = () => {
    setIsSubmitting(true);
    deleteTask.mutateAsync(undefined).then((res) => {
      if (res?.deleteTask) {
        queryRefetch();
        setModalOpen(false);
        setToastText("Task removed!");
        setToastVisible(true);
        const timeId = setTimeout(() => {
          setToastVisible(false);
        }, 3000);
        return () => {
          clearTimeout(timeId);
        };
      } else {
        setIsSubmitting(false);
        setToastText("Error!");
        setToastVisible(true);
        const timeId = setTimeout(() => {
          setToastVisible(false);
        }, 3000);
        return () => {
          clearTimeout(timeId);
        };
      }
    });
  };

  return (
    <>
      <DialogHeader title={"Remove Task?"} />

      <Flex direction="column" gap="30px">
        <Flex direction="row" gap="30px">
          <Text>This action cannot be undone.</Text>
        </Flex>
        <Flex direction="row" gap="8px" justify="space-evenly">
          <Button
            type={"primary"}
            width={"100px"}
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type={"destructive"}
            width={"100px"}
            loading={isSubmitting}
            onClick={() => handleSubmitButtonClick()}
          >
            Remove
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default DeleteTaskModal;
