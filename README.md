# StockGuard AI

A smart retail inventory management system that automates stock monitoring and ad campaign management to optimize capital efficiency for retail businesses.

## 🚀 Overview

StockGuard AI is a full-stack application designed to help retailers:
- Monitor inventory levels in real-time
- Automatically pause ad campaigns when stock is low
- Save capital by preventing ad spend on out-of-stock items
- Provide comprehensive dashboard analytics

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.5.10 with Java 17
- **Database**: PostgreSQL with Spring Data JPA
- **Security**: Spring Security with JWT authentication
- **Documentation**: OpenAPI/Swagger
- **Scheduling**: Spring Boot Scheduler for automated stock monitoring

### Frontend (React)
- **Framework**: React 19.2.0 with Vite
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📁 Project Structure

```
stockguard/
├── api/                    # Spring Boot backend
│   ├── src/main/java/com/ven/ShopSathi/
│   │   ├── ads/           # Ad campaign management
│   │   ├── automation/    # Stock monitoring & automation
│   │   ├── dashboard/     # Analytics & statistics
│   │   ├── inventory/     # Product management
│   │   └── common/        # Shared utilities
│   └── pom.xml           # Maven dependencies
└── ui/                    # React frontend
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Page components
    │   └── api/          # API client
    └── package.json      # NPM dependencies
```

## 🛠️ Features

### Core Functionality
- **Inventory Management**: Track products with SKU, name, and stock levels
- **Campaign Management**: Create and manage advertising campaigns
- **Automated Monitoring**: Scheduled stock checks with automatic campaign pausing
- **Real-time Dashboard**: Live statistics and action feeds
- **Action Logging**: Track all automated actions for audit purposes

### Key Components
- **Stock Monitor Scheduler**: Automatically checks inventory levels
- **Campaign Automation**: Pauses ads when stock < threshold
- **Dashboard Analytics**: Real-time KPIs and metrics
- **Action Feed**: Live feed of all system activities

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 12+
- Maven 3.6+

### Backend Setup

1. **Navigate to API directory**
   ```bash
   cd api
   ```

2. **Configure Database**
   - Update `application.properties` with your PostgreSQL credentials
   - Create database: `stockguard`

3. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

4. **Access API Documentation**
   - Open: `https://stockguard-production-19c2.up.railway.app/swagger-ui.html`

### Frontend Setup

1. **Navigate to UI directory**
   ```bash
   cd ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open: `https://stockguard-theta.vercel.app`

## 📊 API Endpoints

### Dashboard
- `GET /dashboard` - Get dashboard statistics

### Inventory
- `GET /products` - List all products
- `POST /products` - Add new product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Campaigns
- `GET /campaigns` - List all campaigns
- `POST /campaigns` - Create new campaign
- `PUT /campaigns/{id}/pause` - Pause campaign
- `PUT /campaigns/{id}/resume` - Resume campaign

### Automation
- `GET /actions` - Get action log
- `POST /automation/trigger` - Manual stock check

## 🔧 Configuration

### Application Properties (Backend)
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/stockguard
spring.datasource.username=your-username
spring.datasource.password=your-password

# JWT Configuration
jwt.secret=your-secret-key
jwt.expiration=86400000

# Stock Threshold
automation.stock.threshold=10
```

### Environment Variables (Frontend)
```env
VITE_API_BASE_URL=https://stockguard-production-19c2.up.railway.app
```

## 🔄 Automation Logic

The system runs automated stock monitoring every 5 minutes:

1. **Stock Check**: Monitors all products against threshold
2. **Campaign Control**: 
   - Pauses campaigns when stock < threshold
   - Resumes campaigns when stock >= threshold
3. **Action Logging**: Records all automated actions
4. **Dashboard Updates**: Refreshes statistics in real-time

## 🎯 Business Impact

- **Capital Savings**: Prevents ad spend on out-of-stock items
- **Efficiency**: Reduces manual monitoring requirements
- **Analytics**: Provides insights into inventory performance
- **Automation**: Ensures timely campaign management

## 🛡️ Security Features

- JWT-based authentication
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection

## 📈 Monitoring & Logging

- Comprehensive action logging
- Performance metrics
- Error tracking
- Audit trail for all automated actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/swagger-ui.html`
- Review the action logs for troubleshooting

---

**StockGuard AI** - Smart inventory management for modern retail 🛍️