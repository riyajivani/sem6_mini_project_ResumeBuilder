package in.riyajivani.resumebuilder.resumebuilder.controller;

import in.riyajivani.resumebuilder.resumebuilder.model.Template;
import in.riyajivani.resumebuilder.resumebuilder.service.UserService;
import in.riyajivani.resumebuilder.resumebuilder.service.UserSkillService;
import in.riyajivani.resumebuilder.resumebuilder.service.UserTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserTemplateController {

    @Autowired
    private UserTemplateService userTemplateService;

    @Autowired
    private UserService userService;

    @PostMapping("/storeusertemplate/{id}")
    public ResponseEntity<String> storeUserTemplate(@RequestBody Template template, @PathVariable int id){

        if(userService.getUserById(id)!=null && template != null){
            userTemplateService.addUserTemplate(id,template);
            return ResponseEntity.ok("template stored successfully");
        }
        else{
            return ResponseEntity.badRequest().body("User not found or template not exist");
        }
    }

    @GetMapping("/getusertemplates/{id}")
    public ResponseEntity<?> retrieveTemplates(@PathVariable int id){

        if(userService.getUserById(id)!=null){
            List<Template> templates = userTemplateService.getUserTemplates(id);
            return ResponseEntity.ok(templates);
        }
        else{
            return ResponseEntity.badRequest().body("User not found or skills are empty");
        }
    }
}
