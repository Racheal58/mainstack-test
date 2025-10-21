import { Box, Text, Flex, Input } from "@chakra-ui/react";
import { IoChevronDown } from "react-icons/io5";
import { formatDateForInput } from "../../utils/helpers/functions";
import { formatDate } from "../../utils/helpers/functions";

export default function DateRanger({ refState, value, setter, max }) {
  return (
    <>
      <Box position="relative" flex="1">
        <Input
          ref={refState}
          type="date"
          value={formatDateForInput(value)}
          onChange={(e) => setter(new Date(e.target.value))}
          opacity={0}
          position="absolute"
          w="100%"
          h={{ base: "44px", md: "52px" }}
          cursor="pointer"
          max={max}
        />
        <Flex
          bg="#F5F5F5"
          h={{ base: "44px", md: "52px" }}
          borderRadius="12px"
          px={4}
          align="center"
          justify="space-between"
          cursor="pointer"
          onClick={() => refState.current?.showPicker()}
        >
          <Text fontSize={{ base: "13px", md: "15px" }} color="#333">
            {formatDate(value)}
          </Text>
          <IoChevronDown color="#666" />
        </Flex>
      </Box>
    </>
  );
}
