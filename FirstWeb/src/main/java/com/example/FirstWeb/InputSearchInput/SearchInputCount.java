package com.example.FirstWeb.InputSearchInput;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity                     //jpa entity 로 선언
@Table(name="SearchInputCount")  //table명
@Getter @Setter             //getter, setter 메소드
@NoArgsConstructor          //인자 없는 기본 생성자
@AllArgsConstructor         //모든 인자 가지는 생성자
@Builder
public class SearchInputCount {
    @Id                     //pk정의. 필수
    @GeneratedValue(strategy = GenerationType.AUTO) //AUTO_INCREMENT
    @Column(name="ID", nullable = false)            //테이블 컬럼과 매핑
    private Long id;

    @Column(name="SEARCHINPUT", nullable = false, length = 255)
    private String searchInput;

    @Column(name="COUNT", nullable = false)
    private int count;

    @Column(name="DATE", nullable = false)
    private Date date;
}
