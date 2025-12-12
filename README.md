# TokyoIA

AI-Powered Casino Platform with Machine Learning capabilities, built with modern technologies.

## 🚀 Features

- **Backend API**: FastAPI-based REST API with authentication, ML predictions, casino games, and payment processing
- **Web Application**: Modern Next.js web app with React 18 and TypeScript
- **Android App**: Native Android application with Jetpack Compose
- **AI/ML Integration**: Machine learning models for predictions and recommendations
- **Secure Payments**: Multi-method payment processing system
- **Casino Gaming**: Multiple game types including slots, poker, blackjack, and roulette

## 📁 Project Structure

```
TokyoIA/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # Main application
│   │   ├── auth/           # Authentication module
│   │   ├── ml/             # Machine Learning module
│   │   ├── casino/         # Casino gaming module
│   │   └── payments/       # Payment processing module
│   ├── requirements.txt
│   └── README.md
│
├── web/                    # Next.js web application
│   ├── pages/             # Next.js pages
│   ├── components/        # React components
│   ├── public/           # Static assets
│   ├── package.json
│   └── README.md
│
├── android/               # Android application
│   ├── app/
│   ├── build.gradle
│   └── README.md
│
├── .devcontainer/        # Dev container configuration
│   ├── devcontainer.json
│   ├── Dockerfile
│   └── post-create.sh
│
├── .github/              # GitHub configuration
│   ├── workflows/       # CI/CD workflows
│   ├── ISSUE_TEMPLATE.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CONTRIBUTING.md
│
├── README.md            # This file
└── LICENSE             # MIT License
```

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **Python 3.11**: Programming language
- **SQLAlchemy**: Database ORM
- **PyTorch**: Machine learning framework
- **Pydantic**: Data validation

### Web
- **Next.js 14**: React framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS
- **React Query**: Data fetching
- **Axios**: HTTP client

### Android
- **Kotlin**: Programming language
- **Jetpack Compose**: Modern UI toolkit
- **Material 3**: Design system
- **Retrofit**: HTTP client
- **Coroutines**: Async programming

## 🚦 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 20+
- Android Studio (for Android development)
- Git

### Quick Start with Dev Container

The easiest way to get started is using VS Code Dev Containers:

1. Clone the repository:
```bash
git clone https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2.git
cd bug-free-octo-winner-Tokyo-IA2
```

2. Open in VS Code and reopen in container when prompted

3. The environment will be automatically set up!

### Manual Setup

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/main.py
```

The backend API will be available at http://localhost:8000
- API Documentation: http://localhost:8000/docs

#### Web Setup
```bash
cd web
npm install
npm run dev
```

The web application will be available at http://localhost:3000

#### Android Setup
1. Open the `android` directory in Android Studio
2. Sync Gradle files
3. Run on an emulator or device

## 📚 Documentation

- [Backend Documentation](backend/README.md)
- [Web Documentation](web/README.md)
- [Android Documentation](android/README.md)
- [Contributing Guidelines](.github/CONTRIBUTING.md)

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Web Tests
```bash
cd web
npm test
npm run lint
```

### Android Tests
```bash
cd android
./gradlew test
```

## 🔒 Security

Security is a top priority. We have:
- Automated security scans via GitHub Actions
- Dependency vulnerability scanning
- CodeQL analysis
- Regular security audits

To report security issues, please see our security policy.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with modern AI/ML technologies
- Powered by FastAPI, Next.js, and Jetpack Compose
- Designed for scalability and performance

## 📞 Support

- 📧 Email: support@tokyoia.com
- 🐛 Issues: [GitHub Issues](https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/issues)
- 📖 Documentation: [Project Wiki](https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/wiki)

---

Made with ❤️ by the TokyoIA Team