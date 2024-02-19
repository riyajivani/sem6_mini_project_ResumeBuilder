package in.riyajivani.resumebuilder.resumebuilder.controller;

import in.riyajivani.resumebuilder.resumebuilder.model.User;
import in.riyajivani.resumebuilder.resumebuilder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> saveUser(@RequestBody User user) {
        String email = user.getEmail();
        if (user != null && userService.getUserByEmail(email)==null){
            userService.saveUser(user);
            return ResponseEntity.ok("signup successfully");
        }
        else {
            return ResponseEntity.badRequest().body("user already exist");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {


        String email = user.getEmail();
        String password = user.getPassword();
        User storedUser = userService.getUserByEmail(email);

        if (storedUser != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok(storedUser.getEmail());
        }
        else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }
}