import { DataOverlay, Flex, Heading, Text } from "@tycholabs/armillary";
import React from "react";
import { GetAllTasks } from "../../hooks/tasks";
import { Task } from "../../constants/Types";
import TicketCard from "./TicketCard";

export default function Main() {
  const tasksResponse = GetAllTasks();
  const tasksData: Partial<Task>[] = tasksResponse?.data?.tasks;

  return (
    <Flex direction="column" gap="30px">
      <Flex direction="column" gap="8px">
        <Heading>Tickets</Heading>
        <Text color="secondary" size="medium">
          View active and completed tickets here
        </Text>
      </Flex>

      <Flex direction="column" gap="8px">
        <DataOverlay
          loading={tasksResponse.isLoading}
          error={tasksResponse.isError}
          exists={tasksData && tasksData.length > 0}
          title="No tickets found!"
        >
          {tasksData &&
            tasksData.length > 0 &&
            tasksData.map((task) => <TicketCard task={task} />)}
        </DataOverlay>
      </Flex>
    </Flex>
  );
}
