package in.riyajivani.resumebuilder.resumebuilder.controller;

import in.riyajivani.resumebuilder.resumebuilder.model.Education;
import in.riyajivani.resumebuilder.resumebuilder.model.Experience;
import in.riyajivani.resumebuilder.resumebuilder.model.User;
import in.riyajivani.resumebuilder.resumebuilder.service.EducationService;
import in.riyajivani.resumebuilder.resumebuilder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class EducationController {

    @Autowired
    private EducationService educationService;

    @Autowired
    private UserService userService;


    @PostMapping("/storeeducations/{id}")
    public ResponseEntity<String> storeEducations(@RequestBody List<Education> educations, @PathVariable int id){
        User user = userService.getUserById(id);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found with ID: " + id);
        }
        else
        {
            for (Education education : educations) {
                education.setUser(user);
                educationService.saveEducation(education);
            }

            return ResponseEntity.ok("Educations stored successfully");
        }
    }

    @GetMapping("/geteducations/{id}")
    public ResponseEntity<?> getEducations(@PathVariable int id)
    {
        List<Education> educations = educationService.getEducation(id);

        if (educations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        else {
            return ResponseEntity.ok(educations);
        }
    }
}
