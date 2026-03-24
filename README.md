# MentorMinds Stellar - Backend API

Backend API server for the MentorMinds Stellar platform, built with Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Features

- **RESTful API** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** database with connection pooling
- **Stellar SDK** integration for blockchain operations
- **JWT Authentication** for secure user sessions
- **Input Validation** with Zod
- **Security** with Helmet and CORS
- **Logging** with Morgan
- **Environment Configuration** with dotenv

## 📋 Prerequisites

- Node.js 20+ and npm
- PostgreSQL 14+
- Stellar account (testnet for development)

## 🛠️ Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Setup environment variables**:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Database credentials
- JWT secrets
- Stellar network settings
- CORS origins

3. **Setup database**:
```bash
# Create database
createdb mentorminds

# Run migrations (coming soon)
npm run migrate
```

## 🏃 Running the Server

### Development Mode
```bash
npm run dev
```
Server runs on http://localhost:5000 with hot reload

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
mentorminds-backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts  # PostgreSQL configuration
│   │   └── stellar.ts   # Stellar SDK configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   │   ├── errorHandler.ts
│   │   └── notFoundHandler.ts
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── server.ts        # Entry point
├── database/
│   └── migrations/      # Database migrations
├── .env.example         # Environment variables template
├── tsconfig.json        # TypeScript configuration
└── package.json
```

## 🔌 API Endpoints

### Health Check
```
GET /health
```

### API Info
```
GET /api/v1
```

### Coming Soon
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/users/:id` - Get user profile
- `GET /api/v1/mentors` - List mentors
- `POST /api/v1/bookings` - Create booking
- `POST /api/v1/payments` - Process payment
- `GET /api/v1/wallets/:id` - Get wallet info

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 5000 |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `STELLAR_NETWORK` | Stellar network (testnet/mainnet) | testnet |
| `STELLAR_HORIZON_URL` | Horizon server URL | testnet URL |
| `CORS_ORIGIN` | Allowed CORS origins | * |

See `.env.example` for complete list.

## 🧪 Testing

```bash
npm test
```

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 🔒 Security

- Helmet.js for security headers
- CORS configuration
- JWT token authentication
- Input validation with Zod
- SQL injection prevention
- Rate limiting (coming soon)

## 📚 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 5
- **Language**: TypeScript 5
- **Database**: PostgreSQL 14+
- **Blockchain**: Stellar SDK
- **Authentication**: JWT
- **Validation**: Zod
- **Security**: Helmet, CORS
- **Logging**: Morgan

## 🚧 Development Roadmap

- [x] Project setup
- [x] Basic Express server
- [x] Database configuration
- [x] Stellar SDK integration
- [ ] Authentication endpoints
- [ ] User management
- [ ] Mentor management
- [ ] Booking system
- [ ] Payment processing
- [ ] Wallet management
- [ ] Admin dashboard API

## 📖 Documentation

- [API Documentation](./docs/API.md) (coming soon)
- [Database Schema](./docs/DATABASE.md) (coming soon)
- [Stellar Integration](./docs/STELLAR.md) (coming soon)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming and PR conventions.

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review the codebase

---

**Status**: 🟢 Active Development

Built with ❤️ for the MentorMinds Stellar platform
