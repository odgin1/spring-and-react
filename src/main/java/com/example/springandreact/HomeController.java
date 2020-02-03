package com.example.springandreact;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping(value = {"/"})
    public String index() {
        return "index.html";
    }

    @GetMapping("/signin")
    public String login() {
        return "signin";
    }

}
