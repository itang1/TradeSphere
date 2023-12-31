# TradeSphere

Server- and client-side code for a web application showcasing the prettified output of complex and dynamically-generated SQL queries that pull international trade data from [TradingEconomics.com](https://www.TradingEconomics.com), among other sources.

The application runs locally on your machine. Follow the installation instructions below.

View the [Final Report](Final_Report.pdf) for details about the database architecture, table normalization practices, API specification, query performance and evaluation, and Entity-Relation (ER) diagram.

View the [Video Demo](https://drive.google.com/file/d/1Nybc92zDlOBBINsfdfigPUxMy5g0cNJv/view?usp=sharing) for a video demonstration of the functionality of each page.

## Installation Instructions 
- Download code as .zip file and extraxt files
- Review config file for updated and accurate information
- Navigate to `server` folder using terminal or command promt
- Install packages and start server using `npm install` and `npm start`
- Navigate to `client` folder using terminal or command promt
- Install packages and start client using `npm install` and `npm start`
- Deprecation warnings can be ignored

### Dependencies

#### Client
- "@emotion/react": "^11.10.5",
- "@emotion/styled": "^11.10.5",
- "@mui/material": "^5.11.1",
- "@mui/x-data-grid": "^5.17.17",
- "@testing-library/jest-dom": "^5.16.5",
- "@testing-library/react": "^13.4.0",
- "@testing-library/user-event": "^13.5.0",
- "@types/leaflet": "^1.7.11",
- "react-leaflet": ">=3.0.0",
- "leaflet": "^1.8.0",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-router-dom": "^6.6.1",
- "react-scripts": "5.0.1",
- "recharts": "^2.2.0"

#### Server
- "cors": "^2.8.5",
- "express": "^4.18.2",
- "mysql": "^2.18.1",
- "nodemon": "^3.0.2",
- "supertest": "^6.3.3"
