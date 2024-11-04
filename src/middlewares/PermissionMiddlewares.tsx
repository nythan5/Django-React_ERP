import { Box, Button, Container, Typography } from "@mui/material";
import { ReactNode } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";

type Props = {
    children: ReactNode;
    codename: string;
}

export const PermissionMiddleware = ({children, codename}: Props) => {
    const navigate = useNavigate();

    const {handlePermissionExist} = useAuth();

    const handleRefreshPage = () =>{
        navigate(0)
    }

    if (!handlePermissionExist(codename)){
        return (
            <Container maxWidth='sm' sx={{mt:16}}>
                <Box textAlign='center'>
                    <img
                        alt="status-500" 
                        height={260}
                        src="/static/images/status/500.svg"
                    />

                    <Typography variant="h2" sx={{my:2}}>
                        Você não tem permissão para acessar esta área!
                    </Typography>

                    <Typography color="text.secondary" sx={{mb:4}}>
                        Tente atualizar a página!
                    </Typography>

                    <Button onClick={handleRefreshPage} variant="contained" sx={{ml:1}}>
                        Atualizar
                    </Button>
                </Box>
            </Container>
        )
    }

    return (
        <>
            {children}
        </>
    )
}