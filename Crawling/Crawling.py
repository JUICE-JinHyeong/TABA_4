#!/usr/bin/env python
# coding: utf-8

# In[ ]:

import importlib_resources
import webdriver_manager.chrome
import wordcloud
import collections
import tqdm
import re
import os

from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import subprocess
import shutil
from selenium.webdriver.common.by import By
import pandas as pd
import time

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 셀레니움 신버전 크롬 드라이버 패키지

from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.common.keys import Keys

# 진행률
from tqdm import tqdm

# 워드 클라우드
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from collections import Counter

# Okt
from konlpy.tag import Okt


class Crawling:
    def __init__(self, name):
        self.name = name
        self.result1 = None
        self.result2 = None

    #     def func1(self):
    #         # func1의 동작 수행
    #         self.result1 = "func1 결과"
    def naver_rest_review(self):
        name = self.name
        # name = input('식당 이름을 검색하세요 : ')

        folder_name = 'result'

        # 현재 작업 디렉토리에 'result' 폴더 생성
        if not os.path.exists(folder_name):
            os.mkdir(folder_name)

        # Chrome headless 설정
        options = Options()
        # options.add_argument('--headless')

        # 드라이버 생성
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

        # name = '고기다 성산흑돼지'
        # 리뷰 페이지 열기
        print(f'현재 크롤링이 진행중인 검색어 : {name}')
        print()
        print('잠시만 기다려주세요.')
        print()
        url = f"https://map.naver.com/v5/search/{name}"

        driver.get(url)
        wait = WebDriverWait(driver, 10)
        iframe = wait.until(EC.presence_of_element_located((By.ID, "entryIframe")))
        driver.switch_to.frame(iframe)

        # 리뷰 클릭
        # veBoZ class tag에 해당하는 요소가 존재하는지 확인

        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "veBoZ")))
        driver.find_element(by=By.XPATH
                            , value='//*[@id="app-root"]/div/div/div/div[5]/div/div/div/div/a[5]/span').click()

        # 최신순 클릭
        # mSdTM class tag가 선택 가능한지 확인

        time.sleep(0.5)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "mSdTM")))
        # wait.until(EC.element_to_be_clickable((By.CLASS_NAME , "mSdTM")))
        driver.find_elements(by=By.CLASS_NAME, value="mSdTM")[1]

        # 리뷰 전체 펼치기
        wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "fvwqf")))
        click = driver.find_element(by=By.CLASS_NAME, value='fvwqf')

        while click is not None:
            try:
                click.click()
            except:
                break

        # driver 객체를 사용하여 body 태그를 찾고, Keys.HOME을 사용하여 스크롤을 맨 위로 이동합니다.
        # fvwqf class tag가 보이지 않으면 진행합니다.

        wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "fvwqf")))
        body = driver.find_element(by=By.TAG_NAME, value='body')
        body.send_keys(Keys.HOME)
        time.sleep(0.1)
        review_click = driver.find_elements(by=By.CLASS_NAME, value='rvCSr')

        for address in tqdm(review_click, desc="숨어있는 리뷰들을 찾는 중입니다."):
            address.click()
            time.sleep(0.2)

        # 리뷰 가져오기
        # 현재는 리뷰만 가져오지만 가져올 데이터를 어떤 것을 정하느냐에 따라 더 많은 정보를 가져올 수도 있다.

        review_lst = []

        review = driver.find_elements(by=By.CLASS_NAME, value='zPfVt')

        for rev_iew in tqdm(review, desc="리뷰들을 가져오고 있습니다."):
            review_lst.append(rev_iew.text)

        telst = []
        for review in tqdm(review_lst, desc="리뷰를 문장별로 분류 중입니다."):
            split_result = [review_s.split('. ') for review_s in review.split('\n')]
            for text_1 in split_result:
                for text_2 in text_1:
                    # 특수문자 알파벳 단일 자음,모음 제거
                    pattern = r"[^가-힣\s]+"
                    result = re.sub(pattern, "", text_2)
                    # 추가로 2칸 이상 공백 1칸으로 통일
                    result = re.sub(r"[\s{2,}]", " ", result)
                    telst.append(result)
                #         df = pd.DataFrame(telst , columns = ['리뷰'])
        #         df.to_excel(f'{name}_리뷰_모음_test.xlsx' , index = False)
        driver.quit()

        self.result = telst

        return telst

    #     def func2(self):
    #         # func2의 동작 수행
    #         self.result2 = "func2 결과: " + self.result1

    def word_count(self):

        lst = self.result

        # 문장에서 단어 추출
        okt = Okt()

        tok_lst_01 = []
        for text_s in tqdm(lst, "단어의 빈도수를 확인합니다."):
            tok_lst_01.append(okt.pos(text_s, norm=True, stem=True))

        # 3차원 구조, 2차원으로 변환
        tok_lst_02 = [item for sublist in tok_lst_01 for item in sublist]

        # 명사와 형용사만 추출

        NN_words = []
        for word, pos in tok_lst_02:
            if 'Noun' in pos:
                NN_words.append(word)
            elif 'Adjective' in pos:
                NN_words.append(word)
            else:
                pass
        # DataFrame으로 변환

        word_counts = Counter(NN_words)

        df = pd.DataFrame.from_dict(word_counts, orient='index', columns=['count'])
        df.index.name = 'word'

        # 정렬
        df_sorted = df.sort_values('count', ascending=False)
        df_sorted

        df_sorted.to_csv(f'result/{self.name}_단어빈도분석.csv', index=True, encoding='euc-kr')

        # 폰트 문제
        # # 워드클라우드로 나타내기
        #
        # # DataFrame에서 단어와 빈도수 추출
        # words = df_sorted.index
        # counts = df_sorted['count']
        #
        # # 단어와 빈도수를 묶은 zip 객체를 딕셔너리로 변환
        # frequencies = dict(zip(words, counts))

        # # 워드 클라우드 생성
        # wordcloud = WordCloud(font_path='./malgun.ttf', background_color='white').generate_from_frequencies(frequencies)
        #
        # # 워드 클라우드 시각화
        # plt.figure(figsize=(8, 6))
        # plt.imshow(wordcloud, interpolation='bilinear')
        # plt.axis('off')
        # plt.show()

        self.result2 = df_sorted

    def final(self):
        self.naver_rest_review()
        self.word_count()
        pass


#         final_result = "func3 결과: " + self.result2 + " (이름: " + self.name + ")"
#         return final_result


print("예시 : 고기다 성산흑돼지")
name = input('식당 이름을 정확하게 기입하세요. 실패시 오류가 발생합니다. : ')
# name = '고기다 성산흑돼지'
search = Crawling(name)
search.final()

print()
print('완료되었습니다! result 폴더를 확인해주세요.')
print('10초 후 화면이 종료됩니다.')
print()
time.sleep(10)