# GenderLator Mobile 📱

A humorous React Native mobile translator app that interprets stereotypical communication styles between genders. Built with Expo and TypeScript.

> **Disclaimer**: This is a fun, satirical app based on common communication stereotypes. Not to be taken seriously! 😊

## 🎯 Features

- 🔄 **Dual Translation Modes**
  - Female → Male: Decode what she *really* means
  - Male → Female: Understand what he's *actually* saying

- 💬 **AI-Powered Translation Engine**
  - Google AI (Gemini) integration for smart translations
  - Context-aware humorous interpretations
  - Real-time translation results

- 📜 **Translation History**
  - Save all your translations locally
  - Expandable message cards
  - Clear history option
  - Timestamp tracking

- 🎨 **Modern UI/UX**
  - Light & Dark mode support
  - Smooth animations
  - Gradient splash screen
  - Intuitive navigation

- 💾 **Data Persistence**
  - AsyncStorage for local data
  - Auto-save translations
  - Remember theme preference

## 📱 Screenshots

> The app features a beautiful gradient splash screen, intuitive translator interface, browsable history, and customizable settings.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn or pnpm
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone or navigate to the project:**

```bash
cd genderlator-mobile
```

2. **Install dependencies:**

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Set up your API key:**

```bash
cp .env.example .env
# Edit .env and add your Google AI API key
```

Open `.env` and replace `your_api_key_here` with your actual Google AI API key:

```
EXPO_PUBLIC_GOOGLE_AI_API_KEY=your_actual_api_key_here
```

**Important:** The `EXPO_PUBLIC_` prefix is required for the API key to be accessible at runtime.

Get your API key from: <https://aistudio.google.com/app/apikey>

4. **Start the app:**

```bash
pnpm start
```

5. **Run on your device:**
   - Scan the QR code with Expo Go (recommended)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (macOS only)
   - Press `w` for web browser

### Important Notes

- **No backend server needed!** The app calls Google's Gemini API directly from the frontend
- Make sure to keep your `.env` file secure and never commit it to version control
- The app requires internet connection to translate text (calls Google AI API)

## 🎮 How to Use

### 1. Splash Screen (2.5s)

The app greets you with an animated logo and automatically transitions to the translator.

### 2. Translator Screen

- **Switch Mode**: Tap the 🔄 button between emoji avatars
- **Translate**:
  1. Enter text (e.g., "I'm fine" or "We need to talk")
  2. Tap "Translate ✨"
  3. See the humorous interpretation below
- **Navigate**:
  - 📜 (top-left) → History
  - ⚙️ (top-right) → Settings

### 3. History Screen

- Tap any translation to expand and see details
- View original message and translation side-by-side
- Clear all history with one tap
- See when each translation was made

### 4. Settings Screen

- Toggle dark/light mode
- View app information
- Return to translator

## 📦 Tech Stack

### Core

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type safety and better DX

### Libraries

- `@react-native-async-storage/async-storage` - Local data persistence
- `expo-linear-gradient` - Beautiful gradient backgrounds
- `expo-constants` - Access to environment variables
- `react-native-reanimated` - Smooth 60fps animations
- `expo-status-bar` - Status bar management

### API Integration

- **Google Gemini AI** - Direct API integration for AI-powered translations
- No backend server required
- Client-side API calls

## 📁 Project Structure

```
genderlator-mobile/
├── App.tsx                      # Main app component
├── app.json                     # Expo configuration
├── babel.config.js              # Babel configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── .env                         # Environment variables (API key)
├── .env.example                 # Example environment file
└── src/
    ├── screens/                 # App screens
    │   ├── SplashScreen.tsx     # Animated splash screen
    │   ├── TranslatorScreen.tsx # Main translator UI
    │   ├── HistoryScreen.tsx    # Translation history
    │   └── SettingsScreen.tsx   # App settings
    ├── components/              # Reusable components
    │   ├── Button.tsx           # Custom button
    │   └── Switch.tsx           # Custom switch
    ├── services/                # API services
    │   └── api.ts               # Gemini API integration
    ├── constants/               # App constants
    │   └── translations.ts      # Translation patterns
    ├── styles/                  # Styling
    │   └── colors.ts            # Color palette
    └── types/                   # TypeScript types
        └── index.ts             # Shared type definitions
```

## 🎨 Translation Examples

### Female → Male Mode

| She says | Translation |
|----------|-------------|
| "I'm fine" | "I have a serious problem and I'm waiting for you to figure it out" |
| "Do what you want" | "If you do it wrong, you'll hear about it for a month" |
| "We need to talk" | "Prepare for an hour-long analysis of our relationship" |
| "I'm not mad" | "I'm furious, but I'm testing if you notice" |
| "It's nothing" | "It's very important to me and you should know" |

### Male → Female Mode

| He says | Translation |
|---------|-------------|
| "Okay" | "I stopped listening 5 minutes ago" |
| "I'll be right there" | "I'll be there in half an hour or later" |
| "I don't know" | "I haven't thought about it and I don't plan to" |
| "It's complicated" | "I don't want to talk about it" |
| "Whatever you want" | "Let's do it your way, then my way" |

## 🛠️ Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

### Expo Commands (while running)

- `r` - Reload the app
- `m` - Toggle developer menu
- `j` - Open debugger
- `?` - Show all commands
- `Ctrl+C` - Stop the server

## 🌐 Platform Support

- ✅ **iOS** - iPhone and iPad (iOS 13+)
- ✅ **Android** - Phones and tablets (Android 5.0+)
- ✅ **Web** - Modern browsers (PWA-ready)

## 🔒 Privacy

- All translation history stored locally on device
- API key stored securely in environment variables
- Direct API calls to Google - no intermediary server
- No analytics or tracking
- No personal data collected or stored

## 🎯 Future Enhancements

Potential features for future versions:

- [ ] React Navigation for smoother transitions
- [ ] Share translations via social media
- [ ] Haptic feedback on interactions
- [ ] Custom translation patterns
- [ ] Multiple languages support
- [ ] Voice input/output
- [ ] Widget support
- [ ] iCloud/Google Drive sync
- [ ] More translation categories (work, family, friends)

## 🤝 Contributing

This is an educational project demonstrating React Native development. Feel free to fork and customize!

### Ideas for Contributions

- Add more translation patterns
- Improve UI/UX design
- Add unit tests
- Implement React Navigation
- Create custom icons
- Add sound effects
- Optimize performance

## 📄 License

Educational project - free to use and modify.

## 👨‍💻 Development Notes

This app demonstrates modern React Native development:

- **Serverless Architecture**: Direct API integration without backend server
- **Environment Variables**: Secure API key management with expo-constants
- **Converting Web to Mobile**: Migrated from React web app
  - Tailwind CSS → StyleSheet
  - Framer Motion → React Native Animated API
  - Radix UI → Native components
  - localStorage → AsyncStorage
- **Platform-Specific Handling**: SafeAreaView, KeyboardAvoidingView
- **Google Gemini Integration**: Direct API calls with system prompts

## ⚠️ Important Note

This app is intended purely for entertainment. It uses stereotypical communication patterns for humorous effect and should not be taken as serious relationship advice or gender psychology. Real communication varies greatly among individuals regardless of gender.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Uses [React Native](https://reactnative.dev/)
- Inspired by common communication stereotypes
- Created for learning and entertainment purposes

---

**Made with ❤️ and a sense of humor**

*Remember: Good communication comes from understanding, not stereotypes!* 😊
