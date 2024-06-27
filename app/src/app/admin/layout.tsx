"use client";
// MUI Components
import { Box, LinearProgress, Alert, Snackbar } from "@mui/material/";

// BiblioKeia Components
import NavBar from "@/components/nav/navBar";
import SideBar from "@/components/nav/sideBar";

// React Hooks
import { Suspense, useState } from "react";

import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";
import styles from '@/app/admin/page.module.css'

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { progress } = useProgress();
  const {
    openSnack,
    setOpenSnack,
    message,
    typeAlert,
  } = useAlert();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ position: "absolute", zIndex: 2200, width: '100%' }}>
        {progress && <LinearProgress />}
      </Box>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeAlert} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <NavBar open={open} setOpen={setOpen} />
      <Box component="nav">
        <SideBar open={open} />
      </Box>
      <Box
        component="main"
        sx={{
          mt: "60px",
          width: "calc(100% - 260px)",
          // height: "calc(100vh - 60px)",
          overflow: "auto",
          flexGrow: 1,
        }}
      >
      {/* <main className={styles.main} > */}
      {children}

      {/* </main> */}
       
      </Box>
    </Box>
  );
}