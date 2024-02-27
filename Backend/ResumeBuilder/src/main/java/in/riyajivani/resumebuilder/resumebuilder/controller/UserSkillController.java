package in.riyajivani.resumebuilder.resumebuilder.controller;

import in.riyajivani.resumebuilder.resumebuilder.model.Skill;
import in.riyajivani.resumebuilder.resumebuilder.service.UserService;
import in.riyajivani.resumebuilder.resumebuilder.service.UserSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserSkillController {

    @Autowired
    private UserSkillService userSkillService;

    @Autowired
    private UserService userService;

    @PostMapping("/storeuserskills/{id}")
    public ResponseEntity<String> storeSkills(@RequestBody List<String> skillNames, @PathVariable int id){

        if(userService.getUserById(id)!=null && !skillNames.isEmpty()){
            userSkillService.addUserSkills(id,skillNames);
            return ResponseEntity.ok("skills stored successfully");
        }
        else{
            return ResponseEntity.badRequest().body("User not found or skills are empty");
        }
    }

    @GetMapping("/getuserskills/{id}")
    public ResponseEntity<?> retrieveSkills(@PathVariable int id){

        if(userService.getUserById(id)!=null){
            List<String> skills = userSkillService.getUserSkills(id);
            return ResponseEntity.ok(skills);
        }
        else{
            return ResponseEntity.badRequest().body("User not found or skills are empty");
        }
    }
}
