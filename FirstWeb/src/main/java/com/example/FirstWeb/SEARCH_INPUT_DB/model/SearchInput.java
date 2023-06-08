// com.example.FirstWeb.model.SearchInput.java
package com.example.FirstWeb.SEARCH_INPUT_DB.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity                     //jpa entity 로 선언
@Getter @Setter             //getter, setter 메소드
@NoArgsConstructor          //인자 없는 기본 생성자
@AllArgsConstructor         //모든 인자 가지는 생성자
@Builder                    //빌더 패턴으로 생성
@Table// 이 이름은 데이터베이스의 테이블 이름과 일치해야 합니다.
public class SearchInput {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) //AUTO_INCREMENT
    @Column(name="ID", nullable = false)            //테이블 컬럼과 매핑
    private Long id;

    @Column(name = "SEARCHINPUT")
    private String searchInput;

    @Column(name = "DATE_")
    private LocalDate date;
}
