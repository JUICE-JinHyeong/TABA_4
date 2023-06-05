package com.example.FirstWeb.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "SEARCHINPUTCOUNT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchInputCount {

    @Id
    @SequenceGenerator(name = "SEARCHINPUT_SEQUENCE", sequenceName = "SEARCHINPUT_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "SEARCHINPUT", nullable = false, length = 255)
    private String searchInput;

    @Column(name = "COUNT", nullable = false)
    private int count;

    @Column(name = "DATE_", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
}
