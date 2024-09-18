package com.sih.visionaries.controller;

import com.sih.visionaries.model.User;
import com.sih.visionaries.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {
    @Autowired
    private  UserRepository userRepository;

    @GetMapping("/get")
            public  void test(){
        User user=new User();
        user.setId(1);
        user.setEmail("hello");
        userRepository.save(user);


    }



}
