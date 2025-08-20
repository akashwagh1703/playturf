// // src/components/Layout.jsx
// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Box, CssBaseline, Toolbar } from "@mui/material";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const Layout = () => {
//   const [open, setOpen] = useState(true);

//   const drawerWidth = 240;
//   const collapsedWidth = 70;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* Navbar (always full width) */}
//       <Navbar open={open} setOpen={setOpen} />

//       {/* Sidebar */}
//       <Sidebar
//         open={open}
//         setOpen={setOpen}
//         drawerWidth={drawerWidth}
//         collapsedWidth={collapsedWidth}
//       />

//       {/* Content Area */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           transition: "padding-left 0.3s ease",
//           // paddingLeft: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
//           width: "100%",
//         }}
//       >
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default Layout;

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 70;

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar open={open} />
      <div
        style={{
          marginLeft: open ? drawerWidth : collapsedWidth,
          transition: "margin-left 0.3s ease",
          width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
        }}
      >
        <Navbar open={open} setOpen={setOpen} />
        <Toolbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
