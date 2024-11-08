import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import { Employee } from "src/models/Employee";
import { useRequests } from "src/utils/requests";
import { isTemplateExpression } from "typescript";

type Props = {
    selectedEmployee: number | '' ;
    setSelectedEmployee: (employee_id:number) => void;

}

const SelectEmployee = ({selectedEmployee, setSelectedEmployee}: Props) => {
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);

    const {getEmployees} = useRequests();

    const handleGetEmployees = async () => {
        const response = await getEmployees();

        if (!response.detail) setEmployeeData(response.data.employees)
    }

    useEffect(() => {
        handleGetEmployees();
    }, [])

    return (
        <FormControl fullWidth>
            <InputLabel>Selecione um Funcionário</InputLabel>
            <Select
                value={selectedEmployee}
                label="Selecione um Funcionário"
                onChange={e => setSelectedEmployee(+e.target.value)}
            >
                {employeeData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name} - {item.email}</MenuItem>
                ))}
                

            </Select>
        </FormControl>
    )
}

export default SelectEmployee;