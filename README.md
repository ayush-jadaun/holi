# E1 ECE Holi Memories Media Gallery

This project is a React-based Media Gallery that displays images and videos with interactive features such as likes, reactions, auto-playing video thumbnails, modal playback, fullscreen toggle, and sharing capabilities. The project is optimized for performance and is organized using multiple memoized components to ensure a smooth user experience.

## Features

- **Responsive Grid Layout:** Displays images and videos in a responsive grid.
- **Auto-playing Video Thumbnails:** Video thumbnails play automatically on mute.
- **Interactive Modal:** Click on a media item to open a modal with playback controls.
- **Likes & Reactions:** Users can like media items and add reactions that trigger confetti effects.
- **Fullscreen Mode:** Toggle fullscreen for an immersive viewing experience.
- **Share & Download:** Native sharing options via the Web Share API and direct downloads.
- **Performance Optimized:** Uses memoization and optimized callbacks to achieve smooth performance.

## Project Structure
```
public/
├── images/
│   ├── a1.jpg
│   └──a2.jpg
├── videos/
│   └── v1.mp4
src/
├── components/
│   ├── MediaGallery.jsx
│   ├── MediaItem.jsx
│   ├── MediaModal.jsx
│   ├── ModalContent.jsx
│   ├── LikeButton.jsx
│   ├── ReactionButton.jsx
│   ├── ReactionIcon.jsx
│   └── VideoThumbnail.jsx
├── utils/
│   └── confettiEffects.js
└── App.jsx
```

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/ayush-jadaun/holi.git
```

2. **Navigate to the project directory:**

```bash
cd holi
```

3. **Install dependencies:**

```bash
npm install
```

4. **Start the development server:**

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## Media Data Format

First put the media file in the respective images or videos folder in public.
Make sure to rename properly.

In `App.jsx`, media items should be provided in the following format:

### For Images
```javascript
{
type: "image",
    url: "/images/a1.jpg", 
    caption: "Description",
}
```

### For Videos
```javascript
{
 type: "video",
    url: "/videos/v1.mp4", 
    caption: "Description",
}
```

## Components Overview

- **MediaGallery:**  
  The main component that renders the media grid. It manages state for selected media, likes, reactions, and handles fullscreen and modal integrations.

- **MediaItem:**  
  Displays individual media items (either an image or a video thumbnail). It includes interactive controls like likes and reaction buttons.

- **VideoThumbnail:**  
  A memoized component that displays video thumbnails. Videos play automatically, on mute, and loop in the background. Clicking on the thumbnail opens the media modal.  
  *Important:* Ensure your environment supports autoplay (e.g., files are served over HTTPS).

- **MediaModal:**  
  A modal component that opens when a media item is clicked. It contains either the full image or video with playback controls such as play/pause, mute/unmute, and fullscreen toggle.

- **ModalContent:**  
  Contains the core content shown within the modal; includes the video or image along with control buttons.

- **LikeButton:**  
  A button that allows users to like a media item. It shows the number of likes in a small badge.

- **ReactionButton & ReactionIcon:**  
  Enables the user to add reactions (such as star, zap, droplet, and heart) to media items. Reactions trigger colorful confetti effects.

- **confettiEffects (Utility):**  
  Located in `src/utils/confettiEffects.js`, this module exports confetti effects functions (heart, star, zap, droplet) using the `canvas-confetti` library.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear commit messages.
4. Open a pull request describing your changes and the issue it addresses.

## Acknowledgements

- [React](https://reactjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [canvas-confetti](https://github.com/catdad/canvas-confetti)
- [React Icons](https://react-icons.github.io/react-icons/)
