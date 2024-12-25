
# Movie App 🎥  

A visually appealing movie app built with React Native. The app allows users to browse movies and search for them. It uses the [TVMaze API](https://api.tvmaze.com/search/shows?q=all) to fetch movie details. The app features a splash screen and navigation similar to Netflix.

---

## 📱 Features  
- **Splash Screen**: A visually captivating introduction screen.  
- **Home Screen**: Displays a list of movies fetched from the API.  
- **Search Screen**: Allows users to search for movies.  
- **Details Screen**: Shows movie details, including title, description, and more.  
- **Bottom Navigation**: Easily switch between the Home and Search screens.

---

## 🛠️ Technologies Used  
- **React Native**  
- **TVMaze API**  
- **JavaScript**  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js installed.  
- React Native CLI installed globally.  
- Code editor (e.g., Visual Studio Code).  

---

## 🖼️ Screenshots  

### Splash Screen  
<img src="./screenshots/splash_screen.png" width="500" />

### Home Screen  
<img src="./screenshots/home_screen.png" width="500" />

### Search Screen  
<img src="./screenshots/search_screen.png" width="500" />

### Details Screen  
<img src="./screenshots/details_screen.png" width="500" />  

---

## 📂 Project Structure  

```plaintext
movie-app/
├── assets/
├── components/
│   ├── MovieCard.js
│   ├── Navbar.js
├── screens/
│   ├── HomeScreen.js
│   ├── SearchScreen.js
│   ├── DetailsScreen.js
├── App.js
├── package.json
├── README.md
```

---

## 📚 API Reference  

This app fetches movie data from the [TVMaze API](https://api.tvmaze.com).  
Example API endpoint:  
```
https://api.tvmaze.com/search/shows?q=all
```
---

## 💡 Acknowledgments  
- [TVMaze API](https://api.tvmaze.com)  
- Inspiration from the Netflix UI.  
