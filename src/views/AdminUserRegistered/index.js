
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { USER_REGISTER_REVENUE_API, USER_REGISTER_STATIC_API } from "~/apis/UserAPI";
import { formatCurrency, formatDate, searchByDate3 } from "~/utils/Common/Format";
import { ErrorCodes } from "~/utils/Common/Message";
import { validateDate } from "~/utils/Common/ValidData";

const AdminUserRegistered = () => {

    const [day, setDay] = useState('');
    const [rows, setRows] = useState([]);
    const [revenue, setRevenue] = useState([]);

    const handleSearch = () => {
        if (!validateDate(formatDate(day))) {
            toast.info(ErrorCodes.INVALID_DATA_FORMAT.message);
        } else {
            setRows(searchByDate3(rows, formatDate(day)));
        }
    }

    const fetchUserRegister = async () => {
        try {
            const res = await USER_REGISTER_STATIC_API();
            if (res) {
                setRows(res);
            }
        } catch (error) {
            console.log(error);
            toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
        }
    }

    const fetchUserRegisterRevenue = async () => {
        try {
            const res = await USER_REGISTER_REVENUE_API();
            if (res) {
                setRevenue(res);
            }
        } catch (error) {
            console.log(error);
            toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
        }
    }

    useEffect(() => {
        fetchUserRegister();
        fetchUserRegisterRevenue();
    }, []);

    return (
        <Box sx={{ mx: 20 }}>
            <Typography variant="h5" sx={{ color: 'gray' }}>
                Manage User Registered
            </Typography>

            <Box sx={{ my: 10, display: 'flex', justifyContent: 'center' }}>
                <BarChart
                    dataset={revenue}
                    xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
                    series={[
                        { dataKey: 'userCount', label: 'Total Users', valueFormatter },
                    ]}
                    {...chartSetting}
                />
            </Box>

            <Box sx={{mt: 5}}>
                <Typography variant='h6' sx={{fontWeight: 'bold', color: 'gray'}}>Search</Typography>
                <Box>
                    <TextField variant="standard" placeholder='Enter a date' sx={{width: '20%'}}
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        type="date"
                    />
                    <Button sx={{mx: 5}} variant="outlined" onClick={handleSearch}>Search</Button>
                </Box>
            </Box>

            <Box sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>ID USER</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Name of User</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Email Address</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Number Phone</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Date Create</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.userId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.userId}
                                </TableCell>
                                <TableCell >{row.userName}</TableCell>
                                <TableCell >{row.email}</TableCell>
                                <TableCell >{row.phone}</TableCell>
                                <TableCell >{formatDate(row.createdAt)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

const chartSetting = {
    yAxis: [
        {
            label: 'Total user register per day (vn₫)',
        },
    ],
    width: 1200,
    height: 400,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};

function valueFormatter(value) {
    return `${formatCurrency(value)} `;
}

export default AdminUserRegistered;