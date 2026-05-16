import streamlit as st
import json
import pickle
import numpy as np
import nltk
import random
from nltk.stem import WordNetLemmatizer
from keras.models import load_model

lemmatizer = WordNetLemmatizer()
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

st.image("https://raw.githubusercontent.com/KANSSSAAAHH/ProjekDTP/main/public/cottonfit-logo.png", width=100) 
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
        if "rekomendasi" in prompt.lower():
            st.image("https://link-gambar-kaos.jpg", caption="Kaos Komunitas - Rp 85.000")

    st.session_state.messages.append({"role": "assistant", "content": response})