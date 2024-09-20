import {
  Button,
  Card,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
  Heading,
  Separator,
  Switch,
  Text,
} from "@tycholabs/armillary";
import React, { Dispatch, SetStateAction } from "react";
import { Task } from "../../constants/Types";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { priorityColors } from "../../constants";
import { CheckTask } from "../../hooks/tasks";

interface TicketCardProps {
  task: Partial<Task>;
  setTaskToEdit: Dispatch<SetStateAction<Partial<Task> | null>>;
  setTaskToDelete: Dispatch<SetStateAction<Partial<Task> | null>>;
  setEditTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  setToastVisible: Dispatch<SetStateAction<boolean>>;
  setToastText: Dispatch<SetStateAction<string>>;
  queryRefetch: any;
}

export default function TicketCard({
  task,
  setTaskToEdit,
  setTaskToDelete,
  setEditTaskModalOpen,
  setDeleteTaskModalOpen,
  setToastVisible,
  setToastText,
  queryRefetch,
}: TicketCardProps) {
  const checkTask = CheckTask(task.id, !task.checked);

  const handleCheckClick = () => {
    checkTask.mutateAsync().then((res) => {
      console.log(res);
      //@ts-expect-error
      if (res?.editTask) {
        queryRefetch();
      } else {
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
    <Card
      style={{
        flexDirection: "row",
        padding: "0px 16px 0px 0px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Separator
        orientation="vertical"
        style={{
          border: `2px solid ${priorityColors[task.priority - 1]}`,
          height: "auto",
        }}
      />
      <Flex direction={"column"} gap="16px" style={{ padding: "16px 0px" }}>
        <Flex direction="row" gap="16px">
          <Checkbox
            checked={task.checked}
            onCheckedChange={(v: boolean) => handleCheckClick()}
          />
          <Flex direction="column">
            <Heading
              color={!task.checked ? "primary" : "secondary"}
              size="xSmall"
              style={!task.checked ? {} : { textDecoration: "line-through" }}
            >
              {task.content}
            </Heading>

            <Text color={!task.checked ? "secondary" : "subdued"}>
              {task.description}
            </Text>

            {/* <Text color={!task.checked ? "secondary" : "subdued"}>
              [DUE DATES HERE]
            </Text> */}
          </Flex>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button width="40px" padding="0px" type="ghost">
                <MoreHorizontal width="24px" height="24px" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent style={{ gap: "8px" }}>
                <DropdownMenuLabel style={{ height: "30px" }}>
                  Ticket options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  style={{ height: "30px" }}
                  onClick={() => {
                    setTaskToEdit(task);
                    setEditTaskModalOpen(true);
                  }}
                >
                  <Pencil width="16px" height="16px" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  style={{ height: "30px" }}
                  onClick={() => {
                    setTaskToDelete(task);
                    setDeleteTaskModalOpen(true);
                  }}
                >
                  <Trash width="16px" height="16px" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </Flex>

        <Flex
          direction="row"
          gap="8px"
          align="center"
          style={{ textAlign: "left" }}
        >
          <Switch />
          <Text color="secondary" size="small" weight="semiBold">
            Shared with Todoist
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
