package com.example.FirstWeb.controller;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;


@RestController
    public class FirstController {

        @GetMapping("/api/hello")
        public String test() {
            return "Hello, world!";
        }

        @PostMapping("/api/save")
        @CrossOrigin(origins = "http://localhost:3000")
        @ResponseBody
        public String saveData(@RequestBody MyData myData) {
            System.out.println("Entering saveData()");
            System.out.println(myData.toString());

            return "Data saved successfully!";
        }
        public static class MyData {
            private String data;

            // getter와 setter 메서드는 필수입니다.
            // Spring에서는 이 메서드들을 사용하여 JSON을 Java 객체로 변환합니다.
    
            public String getData() {
                return data;
            }
    
            public void setData(String data) {
                this.data = data;
            }

            @Override
            public String toString() {
                return "MyData{" +
                        "data='" + data + '\'' +
                        '}';
            }
        }
}
