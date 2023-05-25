package com.example.FirstWeb.repository;
import com.example.FirstWeb.entity.TiberoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TiberoItemRepository extends JpaRepository<TiberoItem, Long> {
}