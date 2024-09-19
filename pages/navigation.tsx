import { Flex, Heading, Text } from "@tycholabs/armillary";
import React from "react";

export default function Navigation() {
  return (
    <Flex direction="column" gap="30px">
      <Flex direction="column" gap="8px">
        <Heading>Navigation page</Heading>
        <Text color="secondary" size="medium">
          This is really just here to test routing behavior, honestly
        </Text>
      </Flex>
    </Flex>
  );
}
