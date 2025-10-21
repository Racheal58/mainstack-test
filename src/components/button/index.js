import { Button } from "@chakra-ui/react";

export default function CustomButton({ label, ...rest }) {
  return <Button {...rest}>{label}</Button>;
}
