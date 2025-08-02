Your code is a **Sentiment Analysis Web Application** that uses Flask (Python backend) and HTML/JS (frontend). It takes **text or a URL**, performs sentiment analysis using **NLTK's VADER**, shows results via **graphs (Chart.js)**, and also generates a **text summary**.

---

## 🔍 Code Breakdown (What Your Code Does)

### 💡 Frontend (`HTML + JavaScript`)

* **Text Inputs**:

  * User can either **type/paste text** or **paste a link**.
* **Buttons**:

  * `Link` button: extracts article content from a URL using the backend.
  * `Analysis` button: performs sentiment analysis and summarization.
* **Charts**:

  * Bar chart: Shows positive, negative, neutral, compound sentiment.
  * Donut chart: Word-level sentiment count.
* **Word Classification**:

  * Positive, Negative, Neutral words are displayed.
* **Animations**:

  * Adds fade/pulse animation on results when updated.

---

### ⚙️ Backend (`Flask + NLTK`)

* **Libraries Used**:
  `nltk`, `goose3`, `flask`, `flask_cors`, `heapq`, `Chart.js`

* **Endpoints**:

  * `/submit`:

    * Accepts text input
    * Uses VADER to classify overall mood (😐 😁 😔)
    * Returns sentiment scores & classified words
  * `/link`:

    * Accepts a URL
    * Extracts article text using `goose3`
  * `/analysis`:

    * Accepts text
    * Summarizes the input using frequency-based extractive summarization

* **Word Classification**:

  * Each word is classified as Positive / Negative / Neutral based on VADER word-level scores.

---

## ✅ Final `README.md`

```markdown
# 🧠 Sentiment Analysis Web App

This is a full-stack web application for performing **sentiment analysis** and **text summarization**.  
Built using **Flask** (Python backend), **HTML/CSS/JS** frontend, and **Chart.js** for visualizations.

---

## 🌐 Live Demo
*(Add link if deployed using Render/Heroku/Vercel)*

---

## 🛠 Features

- 📝 Analyze custom text input
- 🌐 Paste a link to extract article text using `goose3`
- 🎭 Classifies mood as 😊 😐 😔
- 📊 Displays results with bar and donut charts
- 📃 Shows a summary of the input content
- 📌 Shows most frequent positive, neutral, and negative words

---

## ⚙️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Chart.js  
- **Backend**: Flask (Python), NLTK, Goose3  
- **NLP**: VADER Sentiment Analyzer, Frequency-based Text Summarization  

---

## 📁 Folder Structure

```

sentiment-analysis/
│
├── static/
│   ├── style0.css
│   └── script.js
├── templates/
│   └── index.html
├── app.py
└── README.md

````

---

## 🚀 Running the App Locally

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/sentiment-analysis-app.git
cd sentiment-analysis-app
````

### 2. Install dependencies

```bash
pip install flask flask-cors goose3 nltk
```

### 3. Run the server

```bash
python app.py
```

### 4. Open in browser

Go to `http://127.0.0.1:5000`

---

## 🧠 How It Works

### Sentiment Analysis

* Uses `nltk.sentiment.vader.SentimentIntensityAnalyzer`
* Returns compound, pos, neu, and neg scores
* Classifies individual words by sentiment

### Link Extraction

* Uses `goose3` to pull cleaned article content from pasted URLs

### Summarization

* Tokenizes text
* Filters stopwords
* Scores sentences by frequency of important words
* Returns top scoring sentences as summary

---

## 📦 Requirements

```txt
flask
flask-cors
nltk
goose3
```

---

## 👨‍💻 Author

**Bhagyam Pathak**

> 🔗 [GitHub](https://github.com/YOUR-USERNAME)
> 💬 Learning ML, building full-stack AI apps

---

## 📜 License

This project is licensed for educational use.

