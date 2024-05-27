// chakra imports
import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {renderThumb, renderTrack, renderView} from "../Scrollbar/Scrollbar";
import Content from "./SidebarContent";

const Sidebar = ({routes} : SidebarProps) => {

    let variantChange = "0.2s linear";
    let shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        "unset"
    );
    // Chakra Color Mode
    let sidebarBg = useColorModeValue("white", "navy.800");
    let sidebarMargins = "0px";

  return (
    <Box
      display={{ xl: "block" }}
      w="100%"
      position="fixed"
      minH="100%"
    >
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="300px"
        h="100vh"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
            <Content routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  );

}

type SidebarProps = { 
    routes: any 
};

export default Sidebar