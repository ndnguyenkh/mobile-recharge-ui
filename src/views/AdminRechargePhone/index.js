
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from "@mui/x-charts";

import { ErrorCodes } from "~/utils/Common/Message";
import { RECHARGE_PHONE_STATIC_API, REVENUE_RECHARGE_PHONE_API } from "~/apis/RechargeOnlineAPI";
import { formatCurrency, formatDate, searchByDate } from "~/utils/Common/Format";
import { validateDate } from "~/utils/Common/ValidData";

const AdminRechargePhone = () => {

    const [day, setDay] = useState('');
    const [rows, setRows] = useState([]);
    const [revenue, setRevenue] = useState([]);

    const handleSearchData = () => {
        if (!validateDate(formatDate(day))) {
            toast.info(ErrorCodes.INVALID_DATA_FORMAT.message);
        } else {
            setRows(searchByDate(rows, formatDate(day)));
        }
    }  

    const handleReload = () => {
        window.location.reload(); // Reload lại trang
    };

    const fetchRechargeOnline = async () => {
        try {
            const res = await RECHARGE_PHONE_STATIC_API();
            if (res[0]) {
                setRows(res);
            }
        } catch (error) {
            console.log(error);
            toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
        }
    }

    const fetchRechargeOnlineRevenue = async () => {
        try {
            const res = await REVENUE_RECHARGE_PHONE_API();
            if (res) {
                setRevenue(res);
            }
        } catch (error) {
            console.log(error);
            toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
        }
    }

    useEffect(() => {
        fetchRechargeOnline();
        fetchRechargeOnlineRevenue();
    }, []);

    return (
        <Box sx={{ mx: 20 }}>
            <Typography variant="h5" sx={{ color: 'gray' }}>
                Manage Recharge Phone
            </Typography>

            <Box sx={{ my: 10, display: 'flex', justifyContent: 'center' }}>
                <BarChart
                    dataset={revenue}
                    xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
                    series={[
                        { dataKey: 'totalRevenue', label: 'Total Revenue', valueFormatter },
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
                    <Button variant="outlined" sx={{ml: 5, mr: 2}} onClick={handleSearchData}>Search</Button>
                    <Button variant="outlined" onClick={handleReload}>Reload</Button>
                </Box>
            </Box>

            <Box sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>ID</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>ID User</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>ID Guest</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Amount</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Date Top Up</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Status</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Number Phone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.rechargeId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.rechargeId}
                                </TableCell>
                                <TableCell >{row.userId}</TableCell>
                                <TableCell >{row.guestIdentifier}</TableCell>
                                <TableCell >{formatCurrency(row.amount)}</TableCell>
                                <TableCell >{formatDate(row.rechargeDate)}</TableCell>
                                <TableCell >{row.status}</TableCell>
                                <TableCell >{row.phone}</TableCell>
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
            label: 'Total revenue per day (vn₫)',
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

export default AdminRechargePhone;