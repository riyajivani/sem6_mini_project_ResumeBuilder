package in.riyajivani.resumebuilder.resumebuilder.controller;

import in.riyajivani.resumebuilder.resumebuilder.model.Details;
import in.riyajivani.resumebuilder.resumebuilder.model.Experience;
import in.riyajivani.resumebuilder.resumebuilder.model.User;
import in.riyajivani.resumebuilder.resumebuilder.service.ExperienceService;
import in.riyajivani.resumebuilder.resumebuilder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ExperienceController {

    @Autowired
    private ExperienceService experienceService;

    @Autowired
    private UserService userService;

    @PostMapping("/storeexperiences/{id}")
    public ResponseEntity<String> storeExperiences(@RequestBody List<Experience> experiences, @PathVariable int id){
        User user = userService.getUserById(id);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found with ID: " + id);
        }
        else
        {
            if(!experiences.isEmpty()){
                for (Experience experience : experiences) {
                    experience.setUser(user);
                    experienceService.saveExperience(experience);
                }

                return ResponseEntity.ok("Experiences stored successfully");
            }else{
                return ResponseEntity.badRequest().body("experiences are empty");
            }

        }
    }

    @GetMapping("/getexperiences/{id}")
    public ResponseEntity<?> getExperience(@PathVariable int id)
    {
        List<Experience> experiences = experienceService.getExperience(id);

        if (experiences.isEmpty()) {
            return ResponseEntity.badRequest().body("educations not found");
        }
        else {
            return ResponseEntity.ok(experiences);
        }
    }

    @DeleteMapping("/deleteexperiences/{id}")
    public ResponseEntity<String> deleteExperiences(@PathVariable int id){
        try {
            experienceService.deleteExperiences(id);
            return ResponseEntity.ok("User experiences deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete user experiences");
        }
    }
}
