# TokyoIA Backend

Backend API service for TokyoIA platform built with FastAPI.

## Features

- **Authentication**: User registration, login, and session management
- **Machine Learning**: AI-powered predictions and recommendations
- **Casino**: Gaming functionality with multiple game types
- **Payments**: Secure payment processing for deposits and withdrawals

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
python app/main.py
```

Or using uvicorn directly:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── main.py          # Main FastAPI application
│   ├── auth/            # Authentication module
│   ├── ml/              # Machine Learning module
│   ├── casino/          # Casino gaming module
│   └── payments/        # Payment processing module
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Environment Variables

Create a `.env` file in the backend directory:

```
DATABASE_URL=sqlite:///./tokyoia.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Testing

```bash
pytest
```

## Deployment

See main project README for deployment instructions.
