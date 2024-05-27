import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue, Icon } from "@chakra-ui/react";


export function SidebarLinks(props : any) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName : string) => {
        const regex = new RegExp(`^${routeName}(/|$)`);
        return regex.test(location.pathname);
  };

  return (
    routes.map((route : any, index : number) => {
        return (<NavLink to={route.path} key={index}>
          {route.icon ? (
            <Box>
              <HStack
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                }
                py="5px"
                ps="10px"
              >
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : textColor
                    }
                    me="18px"
                  >
                    <Icon
                      as={route.icon}
                      width="20px"
                      height="20px"
                      color="inherit"
                    />
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : textColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                </Flex>
                <Box
                  h="36px"
                  w="4px"
                  bg={
                    activeRoute(route.path.toLowerCase())
                      ? brandColor
                      : "transparent"
                  }
                  borderRadius="5px"
                />
              </HStack>
            </Box>
          ) : (
            <Box>
              <HStack
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                }
                py="5px"
                ps="10px"
              >
                <Text
                  me="auto"
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : inactiveColor
                  }
                  fontWeight={
                    activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                  }
                >
                  {route.name}
                </Text>
                <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
              </HStack>
            </Box>
          )}
        </NavLink>)
    })
  )

//   return createLinks(routes);
}

export default SidebarLinks;
