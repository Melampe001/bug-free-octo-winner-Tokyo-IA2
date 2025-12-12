# Contributing to TokyoIA

Thank you for your interest in contributing to TokyoIA! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the [Issues](https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/issues)
2. If not, create a new issue using the bug report template
3. Provide as much detail as possible including:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Environment details

### Suggesting Enhancements

1. Check if the enhancement has already been suggested
2. Create a new issue with a clear description of the enhancement
3. Explain why this enhancement would be useful
4. Provide examples if possible

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass
6. Update documentation as needed
7. Commit your changes with clear commit messages
8. Push to your fork
9. Create a Pull Request

### Development Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/main.py
```

#### Web
```bash
cd web
npm install
npm run dev
```

#### Android
1. Open the `android` directory in Android Studio
2. Sync Gradle files
3. Run on an emulator or device

## Code Style

### Python (Backend)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions and classes
- Run `black` for formatting
- Run `flake8` for linting

### TypeScript/JavaScript (Web)
- Follow the existing code style
- Use ESLint for linting
- Use Prettier for formatting
- Write meaningful variable and function names

### Kotlin (Android)
- Follow Kotlin coding conventions
- Use meaningful variable and function names
- Add comments for complex logic

## Testing

### Backend
```bash
cd backend
pytest
```

### Web
```bash
cd web
npm test
npm run lint
```

### Android
```bash
cd android
./gradlew test
```

## Commit Messages

- Use clear and descriptive commit messages
- Start with a verb in present tense (e.g., "Add feature", "Fix bug", "Update documentation")
- Reference issue numbers when applicable

Example:
```
Add payment processing endpoint

- Implement deposit and withdrawal functionality
- Add validation for payment methods
- Update API documentation

Fixes #123
```

## Code Review Process

1. All pull requests require at least one review
2. Address review comments promptly
3. Keep pull requests focused and atomic
4. Ensure CI checks pass

## Community Guidelines

- Be respectful and inclusive
- Help others in the community
- Provide constructive feedback
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## Questions?

If you have questions, feel free to:
- Open an issue
- Ask in pull request comments
- Contact the maintainers

Thank you for contributing to TokyoIA! 🚀
