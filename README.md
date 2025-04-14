# Next.js PostgreSQL Starter with Drizzle ORM


A modern starter template featuring:
- Next.js App Router
- TypeScript
- PostgreSQL via Neon
- Drizzle ORM for database operations
- Auth.js for authentication
- Tailwind CSS (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- GitHub account (for authentication)

### 1. Clone the repository
```bash
git clone https://github.com/meleayi/NextAuthUsingDrizzleNeon.git
cd your-repo


## Install Dependancies
```bash
npm install


## Set up environment variables
Create .env file:

```bash
DATABASE_URL="postgresql://user:password@ep-cool-name.neon.tech/neondb?sslmode=require"
AUTH_SECRET=$(openssl rand -hex 32)
NEXTAUTH_URL="http://localhost:3000"


## Database Setup

```bash
npx drizzle-kit generate:pg
npm run db:migrate

## Run development server
npm run dev