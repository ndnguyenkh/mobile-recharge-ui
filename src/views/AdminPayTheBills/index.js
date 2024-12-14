
import { useEffect, useState } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from "@mui/x-charts";

import { POST_BILL_PAYMENT_STATIC_API, REVENUE_POST_BILL_PAYMENT_API } from "~/apis/PostBillPaymentAPI";
import { ErrorCodes } from "~/utils/Common/Message";
import { formatCurrency, formatDate, searchByDate2 } from "~/utils/Common/Format";
import { validateDate } from "~/utils/Common/ValidData";

const AdminPayTheBills = () => {

    const [day, setDay] = useState('');
    const [rows, setRows] = useState([]);
    const [revenue, setRevenue] = useState([]);

    const handleSearch = () => {
        if (!validateDate(formatDate(day))) {
            toast.info(ErrorCodes.INVALID_DATA_FORMAT.message);
        } else {
            setRows(searchByDate2(rows, formatDate(day)));
        } 
    }

    const handleReload = () => {
        window.location.reload(); // Reload lại trang
    };

    const fetchPostBillPayment = async () => {
        try {
            const res = await POST_BILL_PAYMENT_STATIC_API();
            const revenue = await REVENUE_POST_BILL_PAYMENT_API();
            if (res && revenue) {
                setRows(res);
                setRevenue(revenue);
            }
        } catch (error) {
            console.log(error);
            toast.error(ErrorCodes.SERVER_ERROR.message);
        }
    }

    const fetchPostBillPaymentRevenue = async () => {
        try {
            const res = await REVENUE_POST_BILL_PAYMENT_API();
            if (res) {
                setRevenue(res);
            }
        } catch (error) {
            console.log(error);
            toast.error(ErrorCodes.SERVER_ERROR.message);
        }
    }

    useEffect(() => {
        fetchPostBillPayment();
        fetchPostBillPaymentRevenue();
    }, []);


    return (
        <Box sx={{ mx: 20 }}>
            <Typography variant="h5" sx={{ color: 'gray' }}>
                Manage Pay The Bills
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
                    <Button variant="outlined" sx={{ml: 5, mr: 2}} onClick={handleSearch}>Search</Button>
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
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Bill Number</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Amount</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Date Payment</TableCell>
                                <TableCell sx={{color: 'gray', fontWeight: 'bold', fontSize: '22px'}}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.paymentId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.paymentId}
                                </TableCell>
                                <TableCell >{row.userId}</TableCell>
                                <TableCell >{row.billNumber}</TableCell>
                                <TableCell >{formatCurrency(row.amount)}</TableCell>
                                <TableCell >{formatDate(row.paymentDate)}</TableCell>
                                <TableCell >{row.status}</TableCell>
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

export default AdminPayTheBills;