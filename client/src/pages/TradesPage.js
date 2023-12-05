import React, { useEffect, useState } from 'react';
import { Button, Container, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend} from 'recharts'


const config = require('../config.json');


export default function TradingPage() {

  const [pageSize, setPageSize] = useState(10);
  const [volume, setVolume] = useState([]);
  const [traidd, setTraidD] = useState([]);
  const [traidp, setTraidP] = useState([]);
  const [traidpc, setTraidPC] = useState([]);

  const [countries2, setCountries2] = useState('');
  const [type, setType] = useState('')
  const [type2, setType2] = useState('')
  const [type3, setType3] = useState('')
  const [type4, setType4] = useState('')
  const [categories, setCategories] = useState('')
  const [categories2, setCategories2] = useState('')


  const [data, setData] = useState([])
  const [data2, setData2] = useState([])


  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/trading_volume`)
      .then(res => res.json())
      .then(vol => setVolume(vol))
      .catch(error => console.error(error))

  }, []);
  //console.log(volume)

  const searchVol = () => {
    fetch(`http://${config.server_host}:${config.server_port}/trading_volume?type=${type}`
    )
      .then(res => res.json())
      .then(vol => setVolume(vol))
      .catch(error => console.error(error))
  }
  //console.log(volume)

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/trading_data`)
      .then(res => res.json())
      .then(resJson => setTraidD(resJson))
      .catch(error => console.error(error));

  }, []);
  //console.log(traidd)

  const searchTraidD = () => {
    fetch(`http://${config.server_host}:${config.server_port}/trading_data?type=${type2}` +
      `&category=${categories}`)
      .then(res => res.json())
      .then(resJson => setTraidD(resJson))
      .catch(error => console.error(error));
  }
  //console.log(traidd)

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/trading_partner_catg`)
      .then(res => res.json())
      .then(resJson => setTraidP(resJson))
      .catch(error => console.error(error));

  }, []);
  //console.log(traidp)

  const searchTraidP = () => {
    fetch(`http://${config.server_host}:${config.server_port}/trading_partner_catg?type=${type3}` +
      `&country2=${countries2}`)
      .then(res => res.json())
      .then(resJson => setTraidP(resJson))
      .catch(error => console.error(error))

  }
  //console.log(traidp)


  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/trading_partner`)
      .then(res => res.json())
      .then(resJson => setTraidPC(resJson))
      .catch(error => console.error(error));

  }, []);
  //console.log(traidpc)

  const searchTraidPC = () => {
    fetch(`http://${config.server_host}:${config.server_port}/trading_partner?type=${type4}` +
      `&category=${categories2}`)
      .then(res => res.json())
      .then(resJson => setTraidPC(resJson))
      .catch(error => console.error(error));
  }
  // console.log(traidpc)



  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/distcountries`)
      .then(res => res.json())
      .then(resJson => setData(resJson))
      .catch(error => console.error(error));
  }, []);
  // console.log(data)

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/distcategories`)
      .then(res => res.json())
      .then(resJson => setData2(resJson))
      .catch(error => console.error(error));

  }, []);


  const columnsVol = [
    { field: 'Continent', headerName: 'Continent', flex: 1 },
    { field: 'TotalExportValue', headerName: 'Volume', flex: 1 }
  ]

  const columnsTraiD = [
    { field: 'Country2', headerName: 'Country', flex: 1 },
    { field: 'Year', headerName: 'Year', flex: 1 },
    { field: 'Value', headerName: 'Value', flex: 1 },
  ]

  const columnsTraiP = [
    { field: 'Category', headerName: 'Category', flex: 1 },
    { field: 'Value2', headerName: 'Value', flex: 1 },
  ]

  const [setMarker] = useState([]);
  const onMapClick = (e) => {
    setMarker((current) => [...current,
    {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    ]);
  };

  const menuItems = data.map(item => (
    <MenuItem value={item.Country2}>{item.Country2}</MenuItem>
  ));

  const menuItems2 = data2.map(item => (
    <MenuItem value={item.Category}>{item.Category}</MenuItem>
  ));

  return (

    <Container><div style={{ padding: "10px" }} >
      <h1>International Trade</h1>


      <div style={{ padding: "10px", backgroundColor: '#F4ECE2' }} >
        <p> International trade has been prominent throughout history. However, with social, political, and economic changes, such as increasing globalization, international trade has grown immensly both in value and diversity within the last century. The number and types of goods, as well as the pairings of trading partners convey a complex picture of the global economy and inform decision-making by global powers, such as the United States. Therefore, mapping those relationships and collecting trade information is of uttermost importance to understand the state of the global economy and gain educated insights. </p>
        <p>
          This page provides an overview of trading-related data, including the influence of different trading categories and types on trading patterns between the United States and other countries. The below displayed data should be viewed as an example of exploratory analysis that can be conducted with the abc database but it only displays a small selection of available variables.</p>
      </div>
      <div >
        <h2>Trading by Trade Category </h2>

        <p>
          Trading category is the most diverse part of trading data as it describes what goods were exchanged between the trading partners. The abc database reports on over 1000 categories that range from food, agriculture, clothing to raw materials, tools and more. </p>
      </div>
      <h3>Top 5 Largest Trading Partners with the United States </h3>
      <Grid item xs={2} >
        <InputLabel variant="standard" htmlFor="types">
          Select a Trade Type
        </InputLabel>
        <Select id="types"
          sx={{
            width: 200,
            height: 50,
            border: 1,
            borderColor: '#7E7E7E',
          }}
          label="Type" onChange=
          {(event) => { setType4(event.target.value) }} value={type4} >
          <MenuItem disabled>Choose a Type ...</MenuItem>
          <MenuItem value="Export">Export</MenuItem>
          <MenuItem value="Import">Import</MenuItem>
          <MenuItem value="Re-Export">Re-Export</MenuItem>
        </Select></Grid>

      <Grid item xs={2}>
        <InputLabel variant="standard" htmlFor="categories">
          Select a Category
        </InputLabel>
        <Select id="categories"
          sx={{
            width: 200, height: 50, border: 1, borderColor: '#7E7E7E',

          }} onChange=
          {(event) => { setCategories2(event.target.value) }} value={categories2} options={menuItems2}>
          <MenuItem disabled>Choose a Category ...</MenuItem>
          {menuItems2}

        </Select>
      </Grid>

      <Button onClick={() => searchTraidPC()} style={{ left: '10%', transform: 'translateX(-90%)' }}>
        Search
      </Button>


      <MapContainer center={[54, 15]} zoom={1} scrollWheelZoom={false} style={{ height: '40vh', width: '50wh' }} id="map"
      >
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossOrigin="" />

        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
          integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossOrigin=""></script>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {traidpc.map((marker) => (
          <Marker onClick={onMapClick}
            position={{
              lat: marker.Latitude,
              lng: marker.Longitude
            }} >

            <Popup> Country: {marker.Country2} <br /> Value: {marker.Value}
            </Popup>
          </Marker>))}
      </MapContainer>

      <p> template with interpretation text</p>

      <p>
        To find a more detailed account on the different goods that are exchanged between countries, including all countries within a category and allowing a year filter, can be found below: </p>

      <Grid item xs={2} >
        <InputLabel variant="standard" htmlFor="types">
          Select a Trade Type
        </InputLabel>
        <Select id="types"
          sx={{
            width: 200,
            height: 50, border: 1, borderColor: '#7E7E7E',
          }}
          label="Type" onChange=
          {(event) => { setType2(event.target.value) }} value={type2} >
          <MenuItem disabled>Choose a Type ...</MenuItem>
          <MenuItem value="Export">Export</MenuItem>
          <MenuItem value="Import">Import</MenuItem>
          <MenuItem value="Re-Export">Re-Export</MenuItem>
        </Select>
        <InputLabel variant="standard" htmlFor="categories">
          Select a Category
        </InputLabel>
        <Select id="categories"
          sx={{
            width: 200, height: 50, border: 1, borderColor: '#7E7E7E',

          }} onChange=
          {(event) => { setCategories(event.target.value) }} value={categories} >
          <MenuItem disabled>Choose a Category ...</MenuItem>
          {menuItems2}
        </Select>
      </Grid>

      <Button onClick={() => searchTraidD()} style={{ left: '10%', transform: 'translateX(-90%)' }}>
        Search
      </Button>
      <div style={{ border: 1, backgroundColor: '#D9D9D9' }}>
        <DataGrid
          rows={traidd}
          columns={columnsTraiD}
          getRowId={(vol) => vol.Symbol}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: false},
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 250 },
            },}}
          autoHeight
        /></div>


      <h2>Regional Trading Differences</h2>
      <p> The two below displayed tables showcase the changes of total trade volume by the trade type for the different continents and the largest trading category a country has with the United States. The abc database reports on close to 200 different trading partners with the United States. </p>
      <h3>Volume by Continent</h3>
      <Grid container spacing={2}>

        <Grid item xs={2} >
          <InputLabel variant="standard" htmlFor="types">
            Select a Trade Type
          </InputLabel>
          <Select id="types"
            sx={{
              width: 200,
              height: 50, border: 1, borderColor: '#7E7E7E',
            }}
            label="Type" onChange=
            {(event) => { setType(event.target.value) }} value={type} >
            <MenuItem disabled>Choose a Type ...</MenuItem>
            <MenuItem value="Export">Export</MenuItem>
            <MenuItem value="Import">Import</MenuItem>
            <MenuItem value="Re-Export">Re-Export</MenuItem>
          </Select>

      </Grid>

      <Button onClick={() => searchVol()} style={{ left: '10%', transform: 'translateX(-90%)' }}>
        Search
      </Button> </Grid>
       {/*
      {volume?.map((marker) => (
      <BarChart  width={730} height={250} data={volume}>
              <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Continent" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="TotalExportValue" fill="#9994d8" />
  
        </BarChart>))}*/}
     <div style={{ backgroundColor: '#D9D9D9' }}>
        <DataGrid
          rows={volume}
          columns={columnsVol}
          pageSize={pageSize}
          getRowId={(vol) => vol.Continent}
          rowsPerPageOptions={[5, 10, 25]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: false},
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 250 },
            },}}
          autoHeight
          /></div>
      <h3>Largest Trade Category for United States Trade Partners</h3>
      <Grid item xs={2} >
        <InputLabel variant="standard" htmlFor="types">
          Select a Trade Type
        </InputLabel>
        <Select id="types"
          sx={{
            width: 200,
            height: 50, border: 1, borderColor: '#7E7E7E',
          }}
          label="Type" onChange=
          {(event) => { setType3(event.target.value) }} value={type3} >
          <MenuItem disabled>Choose a Type ...</MenuItem>
          <MenuItem value="Export">Export</MenuItem>
          <MenuItem value="Import">Import</MenuItem>
          <MenuItem value="Re-Export">Re-Export</MenuItem>
        </Select></Grid>

      <Grid item xs={2}>
        <InputLabel variant="standard" htmlFor="countries">
          Select a Country
        </InputLabel> {/*
       <Select id = "continents" placeholder="Continent"
        sx={{width: 200,height: 50,
      }} onChange =
        {handleContinentChange} value = {continent}>
          <MenuItem disabled>Choose a Continent ...</MenuItem>
        {menuItems3}
        </Select> */}

        <Select id="countries" placeholder="Country"
          sx={{
            width: 200, height: 50, border: 1, borderColor: '#7E7E7E',

          }} onChange=
          {(event) => { setCountries2(event.target.value) }} value={countries2} >
          <MenuItem disabled>Choose a Country ...</MenuItem>
          {menuItems}
        </Select>
      </Grid>

      <Button onClick={() => searchTraidP()} style={{ left: '10%', transform: 'translateX(-90%)' }}>
        Search
      </Button>

      <div style={{ backgroundColor: '#D9D9D9' }}>
        <DataGrid
          rows={traidp}
          columns={columnsTraiP}
          getRowId={(vol) => vol.Category}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: false},
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 250 },
            },}}
          autoHeight
        /></div>
    </div>

    </Container>
  );
}

