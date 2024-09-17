import React, { useEffect, useState } from "react";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import axios from "axios";
import { getReportData } from "../../api";
import * as XLSX from 'xlsx';
const currentDate = new Date();
const nextMonthDate = new Date();
nextMonthDate.setMonth(currentDate.getMonth() -1 );
currentDate.setDate(currentDate.getDate() + 1);

// Chuyển đổi sang định dạng YYYY-MM-DD cho các input type="date"
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};
const RevenueTable = () => {
  const [startDate, setStartDate] = useState(formatDate(nextMonthDate));
  const [endDate, setEndDate] = useState(formatDate(currentDate));
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchRevenueData = async () => {
    try {
      const response = await getReportData({ startDate, endDate });
      setData(response.data.data);
      setTotalRevenue(response.data.totalRevenue);
    } catch (error) {
      console.error("Error fetching revenue data", error);
    }
  };

  useEffect(() => {
    fetchRevenueData()
  
    return () => {
      
    }
  }, [])
  
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data); // Create a worksheet from JSON data
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contracts'); // Add the worksheet to the workbook

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'contracts_report.xlsx');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Revenue Report
      </Typography>
      <div className="flex ">
        <TextField
          type="date"
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          type="date"
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={fetchRevenueData}>
          Fetch Report
        </Button>
      </div>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã giao dịch</TableCell>
              <TableCell>Người thuê</TableCell>
              <TableCell>Tên xe</TableCell>
              <TableCell>Hãng xe</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Số ngày thuê</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Trả trước</TableCell>
              <TableCell>Ngày thuê</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{maxHeight: '10vh'}}>
            {data.map((row) => (
              <TableRow key={row.contractId}>
                <TableCell>{row.contractId.slice(-5,-1)}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.carname}</TableCell>
                <TableCell>{row.cartype}</TableCell>
                <TableCell>{row.pricerent} vnd</TableCell>
                <TableCell>{row.dayRent} ngày</TableCell>
                <TableCell>{row.totalPrice} vnd</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.deposits} vnd</TableCell>
                <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Total Revenue: {totalRevenue} VND
      </Typography>
      <Button variant="contained" onClick={exportToExcel}>Export to Excel</Button>
    </div>
  );
};

export default RevenueTable;
