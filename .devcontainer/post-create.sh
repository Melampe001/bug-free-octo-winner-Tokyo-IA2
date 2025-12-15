#!/bin/bash

# Post-create script for TokyoIA development environment

echo "Setting up TokyoIA development environment..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd /workspace/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

# Install web dependencies
echo "Installing web dependencies..."
cd /workspace/web
npm install

# Set up git hooks
echo "Setting up git hooks..."
cd /workspace
git config --global --add safe.directory /workspace

# Create .env files if they don't exist
if [ ! -f /workspace/backend/.env ]; then
    echo "Creating backend .env file..."
    cat > /workspace/backend/.env << EOF
DATABASE_URL=sqlite:///./tokyoia.db
SECRET_KEY=dev-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
EOF
fi

if [ ! -f /workspace/web/.env.local ]; then
    echo "Creating web .env.local file..."
    cat > /workspace/web/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
fi

echo "Development environment setup complete!"
echo ""
echo "To start the backend server:"
echo "  cd backend && source venv/bin/activate && python app/main.py"
echo ""
echo "To start the web server:"
echo "  cd web && npm run dev"
