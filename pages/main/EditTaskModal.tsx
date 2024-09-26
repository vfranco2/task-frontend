import {
  Flex,
  DialogHeader,
  TextInput,
  FormField,
  Button,
  ToggleGroup,
  ToggleGroupItem,
} from "@tycholabs/armillary";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { EditTask } from "../../hooks/tasks";
import { Task } from "../../constants/Types";

export interface EditTaskModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setToastVisible: Dispatch<SetStateAction<boolean>>;
  setToastText: Dispatch<SetStateAction<string>>;
  queryRefetch: any;
  task: Partial<Task>;
}

export interface EditTaskFormValues {
  content: string;
  description: string;
  priority: string;
}

export const EditTaskModal = ({
  setModalOpen,
  setToastVisible,
  setToastText,
  queryRefetch,
  task,
}: EditTaskModalProps) => {
  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTaskFormValues>({
    defaultValues: {
      content: task.content,
      description: task.description,
      priority: `${task.priority}`,
    },
  });

  const editTask = EditTask(
    task.id,
    getValues("content") ?? "",
    parseInt(getValues("priority")) ?? 1,
    getValues("description") ?? "",
    task.shared
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmitButtonClick = () => {
    setIsSubmitting(true);
    editTask.mutateAsync(undefined).then((res) => {
      if (res?.editTask) {
        queryRefetch();
        setModalOpen(false);
        setToastText("Task edited!");
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
      <DialogHeader title={"Edit Task"} />
      <form
        noValidate
        onSubmit={handleSubmit(() => {
          try {
            handleSubmitButtonClick();
          } catch (e) {
            console.log(e);
          }
        })}
      >
        <Flex
          direction="column"
          gap="30px"
          style={{ width: "400px", maxWidth: "95%" }}
        >
          <Flex direction="row" gap="30px" width="100%">
            <Flex direction="column" gap="8px">
              <FormField
                label="Title"
                error={errors && errors.content?.message}
                limit={{
                  value: watch(`content`) ? watch("content").length : 0,
                  cap: 120,
                }}
                required
              >
                <TextInput
                  value={watch(`content`)}
                  {...register(`content`, {
                    required: "Please enter a task title.",
                    maxLength: {
                      value: 120,
                      message: "Title cannot be longer than 120 characters.",
                    },
                  })}
                />
              </FormField>

              <FormField
                label="Description"
                limit={{
                  value: watch(`description`) ? watch("description").length : 0,
                  cap: 240,
                }}
              >
                <TextInput
                  value={watch(`description`)}
                  {...register(`description`, {
                    maxLength: {
                      value: 240,
                      message:
                        "Description cannot be longer than 240 characters.",
                    },
                  })}
                />
              </FormField>

              <FormField label="Priority" required>
                <ToggleGroup
                  type="single"
                  value={watch(`priority`)}
                  onValueChange={(val: string) => {
                    if (val.length > 0) {
                      setValue(`priority`, val);
                    }
                  }}
                  {...register(`priority`, {
                    required: "Please select a priority.",
                  })}
                >
                  <ToggleGroupItem value={`${1}`}>Low</ToggleGroupItem>
                  <ToggleGroupItem value={`${2}`}>Moderate</ToggleGroupItem>
                  <ToggleGroupItem value={`${3}`}>Important</ToggleGroupItem>
                  <ToggleGroupItem value={`${4}`}>Urgent</ToggleGroupItem>
                </ToggleGroup>
              </FormField>
            </Flex>
          </Flex>
          <Button
            type={"primary"}
            width={"100px"}
            loading={isSubmitting}
            onClick={() => console.log("Submitted!")}
          >
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default EditTaskModal;
