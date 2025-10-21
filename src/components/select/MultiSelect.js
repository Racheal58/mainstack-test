import {
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
} from "@chakra-ui/react";
import { IoChevronDown } from "react-icons/io5";

export default function MultiSelect({ title, value, options, setter }) {
  return (
    <>
      <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="600" mb={3}>
        {title}
      </Text>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Box}
          bg="#F5F5F5"
          h={{ base: "44px", md: "52px" }}
          borderRadius="12px"
          px={4}
          cursor="pointer"
          mb={6}
          w="100%"
        >
          <Flex align="center" justify="space-between" h="100%">
            <Text
              fontSize={{ base: "13px", md: "15px" }}
              color="#666"
              isTruncated
              flex="1"
              noOfLines={1}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {value.join(", ")}
            </Text>
            <IoChevronDown
              color="#666"
              style={{ flexShrink: 0, marginLeft: "8px" }}
            />
          </Flex>
        </MenuButton>
        <MenuList minW="490px" p={3} borderRadius="12px">
          {options.map((type) => (
            <MenuItem
              key={type}
              onClick={() => setter(type)}
              bg="transparent"
              _hover={{ bg: "#F5F5F5" }}
              borderRadius="8px"
            >
              <Checkbox isChecked={value.includes(type)} mr={2} />
              <Text fontSize="15px">{type}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}
