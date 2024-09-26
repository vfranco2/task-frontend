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
import { AddTask } from "../../hooks/tasks";

export interface AddTaskModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setToastVisible: Dispatch<SetStateAction<boolean>>;
  setToastText: Dispatch<SetStateAction<string>>;
  queryRefetch: any;
}

export interface AddTaskFormValues {
  content: string;
  description: string;
  priority: string;
}

export const AddTaskModal = ({
  setModalOpen,
  setToastVisible,
  setToastText,
  queryRefetch,
}: AddTaskModalProps) => {
  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskFormValues>({
    defaultValues: {
      content: undefined,
      description: undefined,
      priority: "1",
    },
  });

  const addTask = AddTask(
    getValues("content") ?? "",
    parseInt(getValues("priority")) ?? 1,
    getValues("description") ?? ""
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmitButtonClick = () => {
    setIsSubmitting(true);
    addTask.mutateAsync(undefined).then((res) => {
      if (res?.addTask) {
        queryRefetch();
        setModalOpen(false);
        setToastText("Task added!");
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
      <DialogHeader title={"Add Task"} />
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
        <Flex direction="column" gap="30px">
          <Flex
            direction="row"
            gap="30px"
            style={{ width: "400px", maxWidth: "95%" }}
          >
            <Flex direction="column" gap="8px" width={"100%"}>
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

export default AddTaskModal;
