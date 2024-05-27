// Chakra imports
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { HSeparator } from "../Separator/Separator";

const Brand = () => {

    let logoColor = useColorModeValue("navy.700", "white");

    return (
      <Flex align="center" direction="column">
        <Heading color={logoColor} h="26px"  mb="50px" mt="8px">
          Scholar Sync
        </Heading>
        <HSeparator mb="20px" />
      </Flex>
    );
};

export default Brand;
