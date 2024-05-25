import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

type HSeparatorProps = FlexProps & {
  children?: React.ReactNode;
};

const HSeparator = ({ children, ...rest }: HSeparatorProps) => {
  return <Flex h="1px" w="100%" bg="rgba(135, 140, 189, 0.3)" {...rest} />;
};

type VSeparatorProps = FlexProps & {
  children?: React.ReactNode
}

const VSeparator = ({ children, ...rest }: VSeparatorProps) => {
  return <Flex w="1px" bg="rgba(135, 140, 189, 0.3)" {...rest} />;
};

export { HSeparator, VSeparator };
