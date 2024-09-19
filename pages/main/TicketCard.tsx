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
import React from "react";
import { Task } from "../../constants/Types";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { priorityColors } from "../../constants";
import { useMobileStatus } from "../../utils/isMobileStatus";

interface TicketCardProps {
  task: Partial<Task>;
}

export default function TicketCard({ task }: TicketCardProps) {
  const isMobile = useMobileStatus();

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
      <Flex
        direction={isMobile ? "column" : "row"}
        gap="16px"
        style={{ padding: "16px 0px" }}
      >
        <Flex direction="row" gap="16px">
          <Checkbox checked={task.checked} />
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
            <Text color={!task.checked ? "secondary" : "subdued"}>
              [DUE DATES HERE]
            </Text>
          </Flex>
        </Flex>

        <Flex
          direction={isMobile ? "row-reverse" : "column"}
          style={{ width: "auto" }}
          gap="8px"
          align={isMobile ? "center" : "end"}
        >
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
                <DropdownMenuItem style={{ height: "30px" }}>
                  <Pencil width="16px" height="16px" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem style={{ height: "30px" }}>
                  <Trash width="16px" height="16px" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
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
      </Flex>
    </Card>
  );
}
