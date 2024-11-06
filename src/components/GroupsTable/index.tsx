import { Container, Table, TableContainer, TableHead, TableRow, Card, TableCell, TableBody, Typography, Tooltip, IconButton } from "@mui/material"
import { GroupDetail } from "src/models/Group"
import { useAuth } from "src/utils/auth"
import { useRequests } from "src/utils/requests"
import {useTheme} from "@mui/styles"
import { useNavigate } from "react-router"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"
import  DeleteTwoToneIcon  from "@mui/icons-material/DeleteTwoTone"

type Props = {
    groupsList: GroupDetail[],
    refreshList: () => void
}

const GroupsTable = ({groupsList, refreshList}: Props) => {

    const {handlePermissionExists} = useAuth;
    const {deleteGroup} = useRequests();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleEditGroup = (id:number) => {
        navigate(`groups/edit/${id}`)
    }
    
    const handleDeleteGroup = async (id:number) => {
        await deleteGroup(id);
        refreshList();
    }


    return (
        <Container maxWidth='lg'>
            <Card>
                <TableContainer>
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {groupsList.map((group) => (
                                <TableRow hover key={group.id}>
                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            #{group.id}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography 
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {group.name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        {handlePermissionExists('change_group') && 
                                            <Tooltip title="Editar Cargo" arrow>
                                                <IconButton>
                                                    <EditTwoToneIcon onClick={() => handleEditGroup(group.id)}/>
                                                </IconButton>
                                            </Tooltip>
                                        }

                                        {handlePermissionExists('delete_group') &&
                                            <Tooltip title="Deletar Cargo" arrow>
                                                <IconButton>
                                                    <DeleteTwoToneIcon onClick= {() => handleDeleteGroup(group.id)}/>
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
    )
}

export default GroupsTable;