import logo from "./assets/cat-logo_white_bg.png";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-label="logo" sx={{ mr: 2 }}>
                        <img
                            src={logo}
                            alt="Logo"
                            className="mr-2 brand-logo rounded"
                        />
                    </IconButton>
                    <Typography>Project Management 4 U</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
