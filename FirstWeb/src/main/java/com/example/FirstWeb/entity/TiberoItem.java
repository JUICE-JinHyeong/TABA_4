package com.example.FirstWeb.entity;

import lombok.*;

import javax.persistence.*;

    @Entity                     //jpa entity 로 선언
    @Table(name="tibero_test")  //table명
    @Getter @Setter             //getter, setter 메소드
    @NoArgsConstructor          //인자 없는 기본 생성자
    @AllArgsConstructor         //모든 인자 가지는 생성자
    @Builder                    //빌더 패턴으로 생성
    public class TiberoItem {
        @Id                     //pk정의. 필수
        @GeneratedValue(strategy = GenerationType.AUTO) //AUTO_INCREMENT
        @Column(name="id", nullable = false)            //테이블 컬럼과 매핑
        private Long id;

        @Column(name="name", nullable = false, length = 255)
        private String name;

        @Column(name="sold", nullable = false)
        private boolean sold;

    }

