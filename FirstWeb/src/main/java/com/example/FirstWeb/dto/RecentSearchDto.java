// com.example.FirstWeb.dto.RecentSearchDto.java
package com.example.FirstWeb.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentSearchDto {
    private String searchInput;
    private long searchCount;
}
