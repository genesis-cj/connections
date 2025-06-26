#!/bin/bash

echo "🧠 Setting up GENESIS EI-OS development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create project directories
echo "📁 Creating project structure..."
mkdir -p frontend/src/{components/{apps,ui},context,hooks,services,types,utils}
mkdir -p backend/app/{api/v1/endpoints,core,models,schemas,services,ai,utils}
mkdir -p backend/tests
mkdir -p docs
mkdir -p scripts

# Backend setup
echo "🐍 Setting up Python backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cat > .env << EOL
DATABASE_URL=postgresql://postgres:password@localhost:5432/genesis_ei_os
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENAI_API_KEY=your-openai-key-here
EOL
fi

cd ..

# Frontend setup
echo "⚛️ Setting up React frontend..."
cd frontend

# Install dependencies
npm install

# Create .env file
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    cat > .env << EOL
VITE_API_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/ws
VITE_APP_NAME=GENESIS EI-OS
EOL
fi

cd ..

# Docker setup
echo "🐳 Setting up Docker environment..."

# Create Dockerfile for frontend
cat > frontend/Dockerfile << EOL
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
EOL

# Create Dockerfile for backend
cat > backend/Dockerfile << EOL
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
EOL

# Create nginx configuration
cat > nginx.conf << EOL
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:5173;
    }

    upstream backend {
        server backend:8000;
    }

    server {
        listen 80;
        
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /ws/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
}
EOL

# Create development scripts
echo "📜 Creating development scripts..."

cat > scripts/dev.sh << EOL
#!/bin/bash
echo "🚀 Starting GENESIS EI-OS development environment..."

# Start backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=\$!

# Start frontend
cd ../frontend
npm run dev &
FRONTEND_PID=\$!

echo "✅ Development servers started!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"

# Wait for Ctrl+C
trap "kill \$BACKEND_PID \$FRONTEND_PID" EXIT
wait
EOL

cat > scripts/docker-dev.sh << EOL
#!/bin/bash
echo "🐳 Starting GENESIS EI-OS with Docker..."

docker-compose up --build
EOL

cat > scripts/test.sh << EOL
#!/bin/bash
echo "🧪 Running tests..."

# Backend tests
cd backend
source venv/bin/activate
pytest

# Frontend tests
cd ../frontend
npm test
EOL

# Make scripts executable
chmod +x scripts/*.sh

echo "✅ GENESIS EI-OS development environment setup complete!"
echo ""
echo "🚀 To start development:"
echo "   Option 1 (Local): ./scripts/dev.sh"
echo "   Option 2 (Docker): ./scripts/docker-dev.sh"
echo ""
echo "📚 Access points:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:8000"
echo "   API Documentation: http://localhost:8000/docs"
echo "   WebSocket Test: ws://localhost:8000/ws/emotions"
echo ""
echo "🔧 Next steps:"
echo "   1. Update .env files with your actual credentials"
echo "   2. Set up your database (PostgreSQL)"
echo "   3. Configure Redis for caching"
echo "   4. Add your OpenAI API key for AI features"
EOL