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
import json
import pickle

class psng_predict_all_v4: 
    def __init__(self):
        path = ''
        # 저장된 tokenizer 객체 로드
        with open(f'{path}tokenizer.pickle', 'rb') as f:
            self.tokenizer = pickle.load(f) 

    def preprocessing(self,sentence):
        okt = Okt()
        R_st = sentence
        R_st = re.sub("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]", "", R_st)

        if R_st == '' :
            return '-1'

        R_st = str(R_st)
        # R_frm['REVIEW'] = R_frm['REVIEW'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]", "", regex=True)
        # R_frm['REVIEW'].replace('', np.nan, inplace=True)
        # R_frm['REVIEW'] = R_frm['REVIEW'].astype(str)
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
        R_okt = okt.pos(R_st, norm=True , stem=True)
        re_word = lambda x: [word for word, shape in x if shape in ['Verb', 'Adjective', 'Noun', 'VerbPrefix'] if word not in stopwords]
        R_pred = re_word(R_okt)
        return R_pred
    def predict(self, R_pred):
        max_len = 250
        tokenizer = self.tokenizer
        pred = tokenizer.texts_to_sequences(R_pred)
        pred = pad_sequences(pred, maxlen=max_len)
        # 에측 정확도(%)
        return pred
    def prediction(self,sentence) :
        R_pred = self.preprocessing(sentence)
        result = self.predict(R_pred)
        return result
    