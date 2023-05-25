import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import XLSX from "xlsx";

function WordCloud() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    // 엑셀 파일 읽기
    const workbook = XLSX.readFile("./ReviewData/(주)서촌제 스시100_review");
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // 빈도수 계산
    const wordCounts = new Map();
    data.forEach(row => {
      // "your_column_name"을 단어가 있는 엑셀 컬럼 이름으로 바꿔주세요.
      const word = row["your_column_name"];
      const count = wordCounts.get(word) || 0;
      wordCounts.set(word, count + 1);
    });

    // 워드 클라우드 데이터로 변환
    const cloudData = Array.from(wordCounts).map(([text, size]) => ({ text, size }));

    // 워드 클라우드 생성
    cloud()
      .size([500, 500])
      .words(cloudData)
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Impact")
      .fontSize(d => d.size)
      .on("end", setWords)
      .start();
  }, []);

  return (
    <svg width="500" height="500">
      <g transform="translate(250,250)">
        {words.map(word => (
          <text
            style={{ font: "Impact" }}
            textAnchor="middle"
            transform={`translate(${word.x}, ${word.y})rotate(${word.rotate})`}
            fontSize={word.size}
          >
            {word.text}
          </text>
        ))}
      </g>
    </svg>
  );
}

export default WordCloud;
