import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import routes from "../../context/routes"
import { Box, useBreakpointValue, Portal } from "@chakra-ui/react"

const RootLayout = () => {

  const marginTop = useBreakpointValue({ base: "165px", md:"100px", xl: "100px" });

  return (
      <Box>
        <Sidebar routes={routes} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 285px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 285px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
          mt={marginTop}
        >
          <Box px={"20px"} pb={'10px'}>
            <Outlet />
          </Box>
          <Portal>
            <Navbar />
          </Portal>
        </Box>
      </Box>
  );
}

export default RootLayout