package com.example.springandreact;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = {"/","/xxx"})
    public String index() {
        return "index.html";
    }
}
