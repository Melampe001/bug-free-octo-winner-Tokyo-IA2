# Contributing to TokyoIA

Thank you for your interest in contributing to TokyoIA! We welcome contributions from the community and appreciate your help in making this project better.

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Making Changes](#making-changes)
- [Testing Requirements](#testing-requirements)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Community Guidelines](#community-guidelines)

## How to Contribute

### Reporting Bugs

1. **Search existing issues** in the [Issues](https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/issues) to avoid duplicates
2. **Create a new issue** using the bug report template
3. **Provide detailed information**:
   - Clear title and description
   - Steps to reproduce the issue
   - Expected vs. actual behavior
   - Screenshots or error logs if applicable
   - Environment details (OS, Python version, Node version, etc.)
   - Code snippets if relevant

### Suggesting Enhancements

1. **Check existing issues** to see if the enhancement has been suggested
2. **Create a new issue** with the enhancement label
3. **Explain the enhancement**:
   - Clear description of the proposed feature
   - Why it would be useful to users
   - Possible implementation approaches
   - Examples or mockups if applicable

### Security Vulnerabilities

**Do not** create public issues for security vulnerabilities. Instead, email the maintainers directly or use GitHub's private security advisories.

## Development Setup

### Prerequisites

- **Backend**: Python 3.11+, pip, virtualenv
- **Web**: Node.js 16+, npm or yarn
- **Android**: Java 17+, Android SDK, Gradle
- **Git**: Version control
- **Optional**: Docker for containerized development

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies
pip install pytest pytest-cov black flake8 mypy isort

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Run the server
cd app
python main.py
```

### Web Setup

```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

### Android Setup

```bash
# Navigate to android directory
cd android

# Create local.properties
echo "sdk.dir=/path/to/android/sdk" > local.properties

# Build debug
./gradlew assembleDebug

# Or open in Android Studio
# File → Open → Select android/ directory
```

### Using Dev Container

The repository includes a complete dev container setup:

```bash
# Option 1: GitHub Codespaces
# Click "Code" → "Create codespace on main"

# Option 2: VS Code Remote Containers
# Open folder in VS Code
# Command Palette → "Remote-Containers: Reopen in Container"
```

## Code Standards

### General Principles

- Write clean, readable, and maintainable code
- Follow the single responsibility principle
- Use meaningful variable and function names
- Comment complex logic, not obvious code
- Keep functions small and focused
- Write self-documenting code when possible

### Python (Backend)

#### Style Guide
- Follow **PEP 8** style guide strictly
- Use **type hints** for all function parameters and return values
- Write **docstrings** for all public functions, classes, and modules
- Maximum line length: 88 characters (Black formatter default)

#### Code Example
```python
from typing import Optional, List
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    """User model with validation."""
    email: EmailStr
    username: str
    age: Optional[int] = None

async def create_user(email: str, username: str) -> User:
    """
    Create a new user in the database.
    
    Args:
        email: User's email address
        username: User's unique username
        
    Returns:
        User: Created user object
        
    Raises:
        ValueError: If user already exists
    """
    # Implementation
    pass
```

#### Tools and Commands
```bash
# Format code (required before commit)
black app/

# Sort imports
isort app/

# Lint code
flake8 app/

# Type checking
mypy app/

# Run all checks
black app/ && isort app/ && flake8 app/ && mypy app/
```

#### Testing Standards
- Write **pytest** tests for all new functions
- Use **table-driven tests** for multiple scenarios
- Aim for **80%+ code coverage**
- Mock external dependencies

```python
import pytest
from app.auth import authenticate_user

@pytest.mark.parametrize("email,password,expected", [
    ("user@example.com", "correct", True),
    ("user@example.com", "wrong", False),
    ("invalid@example.com", "any", False),
])
async def test_authenticate_user(email, password, expected):
    result = await authenticate_user(email, password)
    assert result.success == expected
```

### TypeScript/React (Web)

#### Style Guide
- Use **ESLint** and **Prettier** for consistent formatting
- Follow **functional component** patterns with hooks
- Use **TypeScript strict mode** - no `any` types
- Prefer **named exports** over default exports (except pages)
- Use **const** for immutable values, avoid `var`

#### Code Example
```typescript
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

interface User {
  id: string
  email: string
  username: string
}

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()
        
        if (error) throw error
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div className="user-profile">
      <h2>{user.username}</h2>
      <p>{user.email}</p>
    </div>
  )
}
```

#### Tools and Commands
```bash
# Lint code
npm run lint

# Fix auto-fixable issues
npm run lint --fix

# Type check
npm run type-check

# Format with Prettier (if configured)
npm run format

# Run all checks
npm run type-check && npm run lint
```

#### Component Standards
- One component per file
- Use descriptive component names (PascalCase)
- Extract complex logic into custom hooks
- Keep components under 200 lines
- Use proper prop types and interfaces

### Kotlin (Android)

#### Style Guide
- Follow **Kotlin coding conventions**
- Use **MVVM architecture** pattern
- Implement **dependency injection** with Hilt/Dagger
- Follow **Android best practices**
- Use **meaningful resource names**

#### Code Example
```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {
    
    private val _user = MutableLiveData<User?>()
    val user: LiveData<User?> = _user
    
    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading
    
    fun loadUser(userId: String) {
        viewModelScope.launch {
            _loading.value = true
            try {
                val result = userRepository.getUser(userId)
                _user.value = result
            } catch (e: Exception) {
                Log.e(TAG, "Error loading user", e)
            } finally {
                _loading.value = false
            }
        }
    }
    
    companion object {
        private const val TAG = "UserViewModel"
    }
}
```

#### Tools and Commands
```bash
# Format code (Android Studio)
# Code → Reformat Code (Ctrl+Alt+L / Cmd+Option+L)

# Run lint checks
./gradlew lint

# Run tests
./gradlew test

# Build debug
./gradlew assembleDebug
```

### Go (Future/Protocol Buffers)

If working with Go code or protocol buffers:

#### Commands
```bash
# Format Go code
make fmt

# Build Go code
make build

# Run tests
make test

# Run all CI checks
make ci

# Generate from proto files
make proto
```

## Making Changes

### Workflow

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bug-free-octo-winner-Tokyo-IA2.git
   cd bug-free-octo-winner-Tokyo-IA2
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2.git
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # Or for bug fixes:
   git checkout -b fix/issue-description
   ```
5. **Make your changes** following the code standards
6. **Write or update tests** for your changes
7. **Run tests locally** to ensure everything works
8. **Commit your changes** with clear messages
9. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
10. **Create a Pull Request** from your fork to the main repository

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your branch
git checkout main
git merge upstream/main

# Update your feature branch
git checkout feature/your-feature-name
git rebase main
```

## Testing Requirements

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest app/tests/test_auth.py

# Run specific test
pytest app/tests/test_auth.py::test_user_login
```

**Requirements**:
- All new code must have tests
- Maintain or improve code coverage (80%+ target)
- Test both success and failure cases
- Mock external dependencies

### Web Tests

```bash
cd web

# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Run tests (if configured)
npm test
```

**Requirements**:
- No TypeScript errors
- No ESLint errors or warnings
- Successful production build
- Component tests for complex logic

### Android Tests

```bash
cd android

# Run unit tests
./gradlew test

# Run with coverage
./gradlew testDebugUnitTestCoverage

# Run instrumented tests
./gradlew connectedAndroidTest
```

**Requirements**:
- Unit tests for ViewModels and business logic
- Integration tests for repositories
- UI tests for critical user flows

## Commit Message Format

Use **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes
- **perf**: Performance improvements
- **ci**: CI/CD changes

### Examples

```
feat(auth): add password reset functionality

Implement password reset flow with email verification.
Users can now request a password reset link via email.

Closes #123
```

```
fix(payments): resolve stripe webhook signature validation

The webhook handler was failing to validate signatures
correctly. Updated to use the latest Stripe SDK method.

Fixes #456
```

```
docs: update deployment guide with Docker instructions

Add comprehensive Docker deployment steps for backend
and web applications.
```

### Rules
- Use present tense ("add" not "added")
- Don't capitalize first letter of subject
- No period at the end of subject
- Limit subject line to 50 characters
- Wrap body at 72 characters
- Reference issues and PRs in footer

## Pull Request Process

### Before Submitting

1. ✅ **All tests pass** locally
2. ✅ **Code is formatted** according to standards
3. ✅ **No linting errors** remain
4. ✅ **Documentation updated** if needed
5. ✅ **Commit messages** follow conventions
6. ✅ **Branch is up to date** with main

### PR Description

Use the provided PR template and include:

- **What**: Clear description of changes
- **Why**: Motivation and context
- **How**: Implementation details
- **Testing**: How you tested the changes
- **Screenshots**: For UI changes
- **Breaking Changes**: If any
- **Related Issues**: Link to issues

### Review Process

1. **Automated checks** run (CI pipeline)
2. **At least one maintainer** reviews your PR
3. **Address feedback** by pushing new commits
4. **Maintainer approves** the PR
5. **PR is merged** into main branch

### After Merge

- Delete your feature branch
- Close related issues if not auto-closed
- Update your fork's main branch

## Common Issues and Solutions

### Backend Issues

**Issue**: Import errors
```bash
# Solution: Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

**Issue**: Database connection errors
```bash
# Solution: Check .env file and database credentials
# Verify SUPABASE_URL and DATABASE_URL
```

**Issue**: Module not found
```bash
# Solution: Check Python path
export PYTHONPATH="${PYTHONPATH}:${PWD}/backend/app"
```

### Web Issues

**Issue**: Build fails with type errors
```bash
# Solution: Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Issue**: Environment variables not loading
```bash
# Solution: Ensure .env.local exists and has proper format
# Restart dev server after changing env vars
```

**Issue**: Port already in use
```bash
# Solution: Kill process or use different port
lsof -ti:3000 | xargs kill -9
# Or
PORT=3001 npm run dev
```

### Android Issues

**Issue**: Gradle sync fails
```bash
# Solution: Clean and rebuild
./gradlew clean
# Invalidate caches in Android Studio
```

**Issue**: SDK not found
```bash
# Solution: Set SDK path in local.properties
echo "sdk.dir=/path/to/android/sdk" > local.properties
```

### Git Issues

**Issue**: Merge conflicts
```bash
# Solution: Resolve conflicts manually
git status  # See conflicted files
# Edit files to resolve conflicts
git add .
git commit
```

**Issue**: Need to update fork
```bash
# Solution: Fetch and merge upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Community Guidelines

### Code of Conduct

- **Be respectful** and professional
- **Be inclusive** and welcoming
- **Be patient** with newcomers
- **Be constructive** in feedback
- **Be collaborative** not competitive

### Best Practices

- **Help others** who have questions
- **Share knowledge** in discussions
- **Document** complex solutions
- **Test thoroughly** before submitting
- **Respond promptly** to review feedback
- **Keep PRs focused** on single features
- **Write clear** issue descriptions

### Communication

- Use **issues** for bugs and features
- Use **discussions** for questions and ideas
- Use **PR comments** for code-specific feedback
- Keep conversations **professional** and **on-topic**

## Recognition

Contributors will be:
- Listed in the project contributors
- Credited in release notes
- Recognized in the community

## Questions?

If you have questions:
- Check existing [documentation](../README.md)
- Search [existing issues](https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/issues)
- Ask in [discussions](https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/discussions)
- Open a new issue with the question label

---

Thank you for contributing to TokyoIA! Your efforts help make this project better for everyone. 🚀

## Additional Resources

- [Main Documentation](../README.md)
- [Architecture Documentation](../ARCHITECTURE.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [Detailed Documentation](../DOCUMENTATION.md)
