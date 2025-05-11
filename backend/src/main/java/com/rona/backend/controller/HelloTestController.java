package com.rona.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloTestController {

    @GetMapping("/test")
    public String hello() {
        return "✅ Backend fungerar i Docker!";
    }
}
