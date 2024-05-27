import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"
import routes from "../../context/routes"
import { Box } from "@chakra-ui/react"

const RootLayout = () => {
  return (
    <>
        <Sidebar routes={routes} />
        <Box ml="300px">
          <Outlet/>
        </Box>
    </>
  )
}

export default RootLayout