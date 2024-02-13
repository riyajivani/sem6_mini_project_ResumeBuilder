package com.resumeBuilder.ResumeBuilder.controller;

import com.resumeBuilder.ResumeBuilder.models.User;
import com.resumeBuilder.ResumeBuilder.rep.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class MyController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/")
    public ResponseEntity<?> addUser(@RequestBody User user)
    {
        try {
            User save = this.userRepository.save(user);
            return ResponseEntity.ok(save);
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving user");
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getUser()
    {
        return ResponseEntity.ok(this.userRepository.findAll());
    }
}
