import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MdOutlineMessage } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { CiBellOn } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import {
  APPS_ITEMS,
  MENU_ITEMS,
  BUTTONS_ITEMS,
} from "../utils/helpers/variableItems";
import { getAPIEndpoint } from "../utils/api/endpoint";

export default function Navbar() {
  const [userData, setUserData] = useState(null);
  const [selected, setSelected] = useState("Revenue");
  const [isAppsSelected, setAppsSelected] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getAPIEndpoint("user");
      if (!response) return;
      setUserData(response);
    };

    fetchUserData();
  }, []);

  const handleButtonClick = (label) => {
    if (label === "Apps") {
      setAppsSelected(!isAppsSelected);
    } else {
      setAppsSelected(false);
      setSelected(label);
    }
  };

  return (
    <Box
      bg="white"
      mx={{ base: 2, md: 4 }}
      rounded="full"
      boxShadow="md"
      px={{ base: 3, md: 6 }}
      py={{ base: 2, md: 4 }}
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex justify="space-between" align="center">
        <IconButton
          aria-label="Logo"
          icon={<BsGrid3X3GapFill size={20} />}
          variant="none"
          size="md"
        />

        <Flex
          gap={{ base: 1, md: 2 }}
          align="center"
          display={{ base: "none", lg: "flex" }}
        >
          {BUTTONS_ITEMS.map((button, index) => {
            if (button.isApps) {
              return (
                <Flex
                  key={index}
                  align="center"
                  gap={2}
                  rounded="full"
                  bg={isAppsSelected ? "black" : "transparent"}
                  color={isAppsSelected ? "white" : "black"}
                  cursor="pointer"
                  _hover={{ bg: isAppsSelected ? "gray.800" : "gray.200" }}
                  onClick={() => handleButtonClick("Apps")}
                >
                  <Menu>
                    <MenuButton
                      as={Button}
                      leftIcon={button.icon}
                      variant="none"
                      size="sm"
                      fontSize="sm"
                    >
                      {button.label}
                    </MenuButton>
                    <MenuList color="black" minW="350" borderRadius="10">
                      {APPS_ITEMS.map((item, index) => (
                        <Box
                          display="flex"
                          alignItems="center"
                          px={4}
                          py={3}
                          m={2}
                          key={index}
                          fontSize={13}
                          _hover={{
                            borderRadius: "10px",
                            borderColor: "#e0e0e0",
                            borderWidth: "1px",
                          }}
                          cursor="pointer"
                          transition="all 0.1s ease"
                        >
                          <Box
                            border="1px solid #e0e0e0"
                            borderRadius="10"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            p={2}
                          >
                            <Icon as={item.icon} w={5} h={5} color="gray.500" />
                          </Box>
                          <Box ml={3} flex="1">
                            <Text fontWeight="bold">{item.label}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {item.description}
                            </Text>
                          </Box>
                          <Icon
                            as={HiOutlineChevronRight}
                            w={3}
                            h={3}
                            color="gray.500"
                            ml={2}
                          />
                        </Box>
                      ))}
                    </MenuList>
                  </Menu>
                  {isAppsSelected && (
                    <>
                      <Divider
                        orientation="vertical"
                        height="30"
                        borderColor="gray.500"
                      />
                      <Text fontSize="sm">Link in Bio</Text>
                      <Icon as={IoChevronDownOutline} w={6} h={6} pr={2} />
                    </>
                  )}
                </Flex>
              );
            }

            return (
              <Button
                key={index}
                leftIcon={button.icon}
                bg={selected === button.label ? "black" : "transparent"}
                color={selected === button.label ? "white" : "black"}
                _hover={{
                  bg: selected === button.label ? "gray.800" : "gray.200",
                }}
                size="sm"
                fontSize="sm"
                rounded="full"
                onClick={() => handleButtonClick(button.label)}
              >
                {button.label}
              </Button>
            );
          })}
        </Flex>

        <Flex gap={{ base: 1, md: 2 }} align="center">
          <IconButton
            aria-label="Notifications"
            icon={<CiBellOn size={20} />}
            variant="none"
            size="sm"
            display={{ base: "none", md: "flex" }}
          />
          <IconButton
            aria-label="Messages"
            icon={<MdOutlineMessage size={20} />}
            variant="none"
            size="sm"
            display={{ base: "none", md: "flex" }}
          />
          <Flex bg="gray.100" rounded="full" p={1} align="center">
            <Avatar
              size="sm"
              bg="black"
              color="white"
              name={
                userData
                  ? userData.first_name + " " + userData.last_name
                  : "User"
              }
              fontSize="xs"
            />
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<RxHamburgerMenu />}
                _hover={{ background: "transparent" }}
                _focus={{ outline: "none" }}
                variant="unstyled"
                pl={3}
              />
              <MenuList minWidth="300px" borderRadius="20">
                <Box display="flex" alignItems="center" px={4} py={3}>
                  <Avatar
                    bg="black"
                    color="white"
                    name={
                      userData
                        ? userData.first_name + " " + userData.last_name
                        : "User"
                    }
                    src=""
                    size="sm"
                  />
                  <Box ml={3}>
                    <Text fontWeight="bold">
                      {userData
                        ? userData.first_name + " " + userData.last_name
                        : "User"}
                      s
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {userData ? userData.email : ""}
                    </Text>
                  </Box>
                </Box>
                {MENU_ITEMS.map((item, index) => (
                  <MenuItem
                    key={index}
                    icon={item.icon}
                    py={3}
                    _hover={{ background: "transparent" }}
                    _focus={{ background: "transparent", outline: "none" }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
