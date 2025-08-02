from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  # Import CORS
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from goose3 import Goose
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
import heapq
from nltk.tokenize import word_tokenize

app = Flask(__name__)
CORS(app) 

# nltk.download('vader_lexicon')
# nltk.download('punkt')

def classify_words(text):
    sia = SentimentIntensityAnalyzer()
    words = word_tokenize(text)

    positive_words = []
    negative_words = []
    neutral_words = []

    for word in words:
        score = sia.polarity_scores(word)['compound']
        if score > 0.05:  
            positive_words.append(word)
        elif score < -0.05: 
            negative_words.append(word)
        else: 
            neutral_words.append(word)

    return positive_words, negative_words, neutral_words

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    
    name = request.json.get('name', '')
    
    bot = SentimentIntensityAnalyzer()
    text = name
    sent = ""

    polarity = bot.polarity_scores(text)["compound"]
    pos = bot.polarity_scores(text)["pos"]
    neg = bot.polarity_scores(text)["neg"]
    neu = bot.polarity_scores(text)["neu"]
    comp = bot.polarity_scores(text)["compound"]

    if polarity > 0.4:
        sent = "😁"
    elif polarity < -0.4:
        sent = "😔"
    else:
        sent = "😐"

    positive_words, negative_words, neutral_words = classify_words(text)

    a = len(positive_words)
    b = len(negative_words)
    c = len(neutral_words)

    return jsonify({"pos":pos,'message': sent,"neg": neg, "neu": neu, "comp" : comp ,"pw": positive_words, "nw": negative_words, "new" : neutral_words,"a":a,"b":b,"c":c})

@app.route('/link', methods=['POST'])
def link():
    url_js = request.json.get('linkdede', '')   
    url = url_js
    goose = Goose()
    article = goose.extract(url)
    sent = article.cleaned_text

    response_message = f"{sent}"
    return jsonify({'message': response_message})


@app.route('/analysis', methods=['POST'])
def analysis():
    name = request.json.get('text', '')

    # nltk.download('punkt')
    # nltk.download('stopwords')
    # nltk.download('punkt_tab')

    def summarize_text(text, summary_ratio=0.3):
        
        sentences = sent_tokenize(text)
        words = word_tokenize(text.lower())

        stop_words = set(stopwords.words('english'))
        filtered_words = [word for word in words if word.isalnum() and word not in stop_words]

        word_frequencies = {}
        for word in filtered_words:
            if word not in word_frequencies:
                word_frequencies[word] = 1
            else:
                word_frequencies[word] += 1

        max_freq = max(word_frequencies.values())
        for word in word_frequencies:
            word_frequencies[word] = word_frequencies[word] / max_freq

        sentence_scores = {}
        for sentence in sentences:
            sentence_word_count = len(word_tokenize(sentence))
            for word in word_tokenize(sentence.lower()):
                if word in word_frequencies:
                    if len(sentence.split(' ')) < 30:  
                        if sentence not in sentence_scores:
                            sentence_scores[sentence] = word_frequencies[word]
                        else:
                            sentence_scores[sentence] += word_frequencies[word]

        summary_sentences = heapq.nlargest(int(len(sentences) * summary_ratio), sentence_scores, key=sentence_scores.get)

        summary = ' '.join(summary_sentences)
        return summary

    summary = summarize_text(name, summary_ratio=0.5)
    sent = summary 
    response_message = f"{sent}"

    return jsonify({'message': response_message})
    print("summary")

if __name__ == '__main__':
    app.run(debug=True)
