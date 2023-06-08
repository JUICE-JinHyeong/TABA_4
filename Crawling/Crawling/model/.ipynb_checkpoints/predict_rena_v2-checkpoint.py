import re
import pandas as pd
import numpy as np 
# import matplotlib.pyplot as plt
# import urllib.request
from collections import Counter
from konlpy.tag import Mecab
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from konlpy.tag import Okt
from tensorflow.keras.models import load_model


class psng_predict_all_v2:
    def __init__(self, df):
        self.df = df
        path = ''
        self.loaded_model = load_model(f'{path}posneg_no_oneword_v3.h5')
        train_data = pd.read_csv(f'{path}train_data_main_v2.csv', encoding='euc-kr')
        X_train = train_data['tokenized'].apply(eval).values
        vocab_size = 20894 # change
        self.tokenizer = Tokenizer(vocab_size, oov_token='OOV')
        self.tokenizer.fit_on_texts(X_train)
        self.max_len = 250

    def preprocessing(self):
        okt = Okt()
        R_frm = self.df.copy()
        R_frm['REVIEW'] = R_frm['REVIEW'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]", "", regex=True)
        R_frm['REVIEW'].replace('', np.nan, inplace=True)
        R_frm['REVIEW'] = R_frm['REVIEW'].astype(str)
        stopwords = ['도', '는', '다', '의', '가', '이', '은',
                     '한', '에', '하', '고', '을', '를', '인', '듯',
                     '과', '와', '네', '들', '듯', '지', '임', '게',
                     '는', '이', '했', '슴', '음', '것', '거', '로',
                     '들', '거', '곳', '분', '원', '더', '왜', '해',
                     '수', '할', '그', '함', '돈', '번', '두', '개',
                     '건', '내', '저', '만', '갈', '걸', '제', '명',
                     '분',
                     '인데', '이가', '했었', '해서',
                     '습니다', '했는데', '입니다']

        okt = Okt()
        # R_frm['tokenized'] = R_frm['리뷰'].apply(okt.pos)
        R_frm['tokenized'] = R_frm['REVIEW'].apply(lambda x: okt.pos(x, norm=True, stem=True))
        R_frm['tokenized'] = R_frm['tokenized'].apply(
            lambda x: [word for word, shape in x if shape in ['Verb', 'Adjective', 'Noun', 'VerbPrefix'] if word not in stopwords])
        R_pred = R_frm['tokenized'].values
        return R_pred

    def predict(self):
        R_pred = self.preprocessing()
        max_len = self.max_len
        tokenizer = self.tokenizer
        result = []
        pred = tokenizer.texts_to_sequences(R_pred)
        pred = pad_sequences(pred, maxlen=max_len)
        score = self.loaded_model.predict(pred)
        return score

    def prediction(self):
        result = []
        score = self.predict()
        for num in range(len(score)):
            if score[num][0] > 0.9:
                result.append('0')
            elif score[num][0] < 0.1:
                result.append('1')
            else:
                result.append('2')
        return result
