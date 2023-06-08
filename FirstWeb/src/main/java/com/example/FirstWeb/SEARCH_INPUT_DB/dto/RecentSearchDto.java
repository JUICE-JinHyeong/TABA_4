// com.example.FirstWeb.dto.RecentSearchDto.java
package com.example.FirstWeb.SEARCH_INPUT_DB.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentSearchDto {
    private String searchInput;
    private long searchCount;
}
