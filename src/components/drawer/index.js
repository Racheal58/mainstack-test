import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import CustomButton from "../button";

export default function CustomDrawer({
  isOpen,
  onClose,
  heading = "Filter",
  children,
  onApply,
  isFilterChanged,
  onClear,
  ...rest
}) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      isCentered
      {...rest}
    >
      <DrawerOverlay bg="rgba(200, 200, 230, 0.4)" />
      <DrawerContent
        borderRadius="24px"
        maxW="520px"
        maxH="98%"
        mt="0.5%"
        p={{ base: 4, md: 6 }}
        mx={{ base: 4, md: 0 }}
      >
        <DrawerCloseButton />
        <DrawerHeader>{heading}</DrawerHeader>

        <DrawerBody p={0}>{children}</DrawerBody>

        <DrawerFooter>
          <CustomButton
            label="Clear"
            bg="white"
            border="1px solid #E0E0E0"
            color="black"
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight="500"
            h={{ base: "44px", md: "52px" }}
            flex="1"
            mr={3}
            borderRadius="full"
            _hover={{ bg: "#F9F9F9" }}
            onClick={onClear}
          />
          <CustomButton
            label="Apply"
            bg={isFilterChanged ? "black" : "#E8E8E8"}
            color="white"
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight="500"
            h={{ base: "44px", md: "52px" }}
            flex="1"
            borderRadius="full"
            _hover={{ bg: "#D0D0D0" }}
            onClick={onApply}
            isDisabled={!isFilterChanged}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
