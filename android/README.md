# TokyoIA Android Application

Native Android application for TokyoIA platform built with Kotlin and Jetpack Compose.

## Features

- Modern Android development with Jetpack Compose
- Kotlin coroutines for async operations
- Material Design 3
- MVVM architecture
- Retrofit for API communication
- Navigation component

## Requirements

- Android Studio Hedgehog or later
- Android SDK 24 or higher
- Kotlin 1.9.20

## Setup

1. Open the project in Android Studio
2. Sync Gradle files
3. Create `local.properties` with your Android SDK path:
```
sdk.dir=/path/to/Android/sdk
```

4. Run the app on an emulator or device

## Project Structure

```
android/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/tokyoia/app/
│   │   │   ├── res/
│   │   │   └── AndroidManifest.xml
│   │   └── test/
│   └── build.gradle
├── build.gradle
└── README.md
```

## Building

### Debug Build
```bash
./gradlew assembleDebug
```

### Release Build
```bash
./gradlew assembleRelease
```

## Testing

```bash
./gradlew test
./gradlew connectedAndroidTest
```

## Technologies

- **Kotlin** - Programming language
- **Jetpack Compose** - Modern UI toolkit
- **Material 3** - Design system
- **Retrofit** - HTTP client
- **Navigation** - App navigation
- **Lifecycle** - Lifecycle-aware components

## API Configuration

The app connects to the backend API. Configure the base URL in your build configuration or use BuildConfig.

## Deployment

See main project README for deployment instructions.
