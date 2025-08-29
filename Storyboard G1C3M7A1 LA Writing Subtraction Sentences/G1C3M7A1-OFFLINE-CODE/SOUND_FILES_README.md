# Sound Files Setup

## Required Audio Files

To enable full audio functionality, place these MP3 files in the `src/assets/` directory:

### 1. `correct.mp3`
- **Purpose**: Plays when user gives correct answer
- **Trigger**: When user crosses exactly 3 cars OR enters correct number (2)
- **Fallback**: If file missing, generates pleasant major chord sound

### 2. `wrong.mp3`  
- **Purpose**: Plays when user gives wrong answer
- **Trigger**: When user crosses wrong number of cars OR enters wrong number
- **Fallback**: If file missing, generates descending error tone

## Current Implementation

The app includes **automatic fallback sounds** generated programmatically:

### ✅ **Car Click Sound** (Always Available)
- Generated using Web Audio API
- Short pop/click sound (800Hz → 400Hz, 0.1s duration)
- No external file needed

### ✅ **Correct Answer Sound** (Fallback Available)
- **Primary**: Tries to load `src/assets/correct.mp3`
- **Fallback**: Generates major chord (C5 + E5, 0.5s duration)
- Pleasant, encouraging sound

### ✅ **Wrong Answer Sound** (Fallback Available)  
- **Primary**: Tries to load `src/assets/wrong.mp3`
- **Fallback**: Generates descending tone (400Hz → 200Hz, 0.3s duration)
- Clear error indication

## How It Works

```javascript
// The app tries MP3 first, falls back to generated sound
const audio = new Audio('src/assets/correct.mp3');
audio.play().catch(() => {
    // If MP3 fails, use generated sound
    generateCorrectSound();
});
```

## Adding Your Own Sounds

1. **Create or download** appropriate MP3 files
2. **Name them exactly**: `correct.mp3` and `wrong.mp3`  
3. **Place in**: `src/assets/` directory
4. **Refresh** the browser - sounds will load automatically

## Sound Characteristics

### Recommended Properties:
- **Format**: MP3 (best browser compatibility)
- **Duration**: 0.3-1.0 seconds (not too long)
- **Volume**: Moderate (app sets 70% volume)
- **Quality**: Clear, pleasant tones

### Current Fallback Sounds:
- **Car click**: Quick, subtle feedback
- **Correct**: Harmonious, encouraging  
- **Wrong**: Clear but not harsh error tone

The app works perfectly with or without the MP3 files! 🔊
