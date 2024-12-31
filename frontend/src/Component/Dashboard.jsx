import React, { useEffect, useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [auctionData, setAuctionData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get('http://localhost:3001/api/auctions');
      setAuctionData(res.data);
      console.log(res.data);
    }
    fetchData();
  }, []);

  const chartData = useMemo(() => {
    const labels = [];
    const values = [];

    auctionData.forEach((auction) => {
      labels.push(auction.item);
      values.push(auction.bidAmount);
    });

    return {
      labels,
      datasets: [
        {
          label: 'Auction Bids',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [auctionData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Auction Data',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>This is the dashboard</h1>
      <h2>Auction Data Bar Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
