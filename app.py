import os
import streamlit as st
import json
import pickle
import numpy as np
import nltk
import random
from nltk.stem import WordNetLemmatizer
from keras.models import Sequential, load_model
from keras.layers import Dense, Dropout
from keras.optimizers import SGD

nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)

lemmatizer = WordNetLemmatizer()

# Auto-train jika model belum ada
if not os.path.exists('chatbot_model.h5'):
    intents = json.loads(open('chatbot.json').read())
    words = []
    classes = []
    documents = []
    ignore_letters = ['?', '!', '.', ',']
    
    for intent in intents['intents']:
        for pattern in intent['patterns']:
            word_list = nltk.word_tokenize(pattern)
            words.extend(word_list)
            documents.append((word_list, intent['tag']))
            if intent['tag'] not in classes:
                classes.append(intent['tag'])
    
    words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_letters]
    words = sorted(set(words))
    classes = sorted(set(classes))
    
    pickle.dump(words, open('words.pkl', 'wb'))
    pickle.dump(classes, open('classes.pkl', 'wb'))
    
    training = []
    output_empty = [0] * len(classes)
    
    for document in documents:
        bag = []
        word_patterns = [lemmatizer.lemmatize(w.lower()) for w in document[0]]
        for word in words:
            bag.append(1) if word in word_patterns else bag.append(0)
        output_row = list(output_empty)
        output_row[classes.index(document[1])] = 1
        training.append([bag, output_row])
    
    random.shuffle(training)
    training = np.array(training, dtype=object)
    train_x = np.array(list(training[:, 0]))
    train_y = np.array(list(training[:, 1]))
    
    model = Sequential()
    model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(len(train_y[0]), activation='softmax'))
    
    sgd = SGD(learning_rate=0.01, momentum=0.9, nesterov=True)
    model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])
    model.fit(train_x, train_y, epochs=200, batch_size=5, verbose=1)
    model.save('chatbot_model.h5')

# Load model dan data
intents = json.loads(open('chatbot.json').read())
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbot_model.h5')

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    return [lemmatizer.lemmatize(word.lower()) for word in sentence_words]

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, word in enumerate(words):
            if word == s: bag[i] = 1
    return np.array(bag)

def get_bot_response(message):
    bow = bag_of_words(message)
    res = model.predict(np.array([bow]), verbose=0)[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    if not results:
        return "Maaf Kak, bot belum paham maksudnya. Bisa hubungi WA admin ya!"
    tag = classes[results[0][0]]
    for i in intents['intents']:
        if i['tag'] == tag:
            return random.choice(i['responses'])

# --- TAMPILAN UI STREAMLIT ---
st.set_page_config(page_title="Cotton Fit AI Assistant", page_icon="👕")

st.markdown("""
<style>
    .stChatMessage:has([data-testid="stChatMessageAvatarUser"]) {
        flex-direction: row-reverse !important;
        background-color: transparent !important;
    }
    .stChatMessage:has([data-testid="stChatMessageAvatarUser"]) .stChatMessageContent {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
    }
    .stChatMessage:has([data-testid="stChatMessageAvatarUser"]) p {
        text-align: right;
        width: 100%;
    }
</style>
""", unsafe_allow_html=True)

st.image("https://raw.githubusercontent.com/KANSSSAAAHH/ProjekDTP/main/src/assets/cottonfit-logo.png", width=100)
st.title("Smart Chat Assistant")
st.write("Kami siap membantu mencari kaos asik untuk momen epikmu!")

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("Ketik pesan atau pertanyaan..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
    response = get_bot_response(prompt)
    with st.chat_message("assistant"):
        st.markdown(response)
    st.session_state.messages.append({"role": "assistant", "content": response})