package in.riyajivani.resumebuilder.resumebuilder.controller;

import in.riyajivani.resumebuilder.resumebuilder.model.Details;
import in.riyajivani.resumebuilder.resumebuilder.model.User;
import in.riyajivani.resumebuilder.resumebuilder.service.DetailService;
import in.riyajivani.resumebuilder.resumebuilder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class DetailController {

    @Autowired
    private DetailService detailService;

    @Autowired
    private UserService userService;



    @PostMapping("/storedetail/{id}")
    public ResponseEntity<String> storeDetail(@RequestBody Details details, @PathVariable int id){

        User user = userService.getUserById(id);
        if(details!=null && user!=null)
        {
            details.setUser(user);
            detailService.saveDetails(details);
            return ResponseEntity.ok("stored user personal detail successfully");
        }
        else{
            return ResponseEntity.badRequest().body("can not stored user details");
        }
    }

    @GetMapping("/getdetail/{id}")
    public ResponseEntity<?> getDetail(@PathVariable int id)
    {
        Details details = detailService.getDetails(id);

        if(details!=null)
        {
            return ResponseEntity.ok(details);
        }
        else
        {
            return ResponseEntity.badRequest().body("user details not exist");
        }
    }

    @DeleteMapping("/deletedetails/{id}")
    public ResponseEntity<String> deleteDetail(@PathVariable int id){
        try {
            // Call service method to delete details by user ID
            detailService.deleteDetails(id);
            return ResponseEntity.ok("User details deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete user details");
        }
    }
}
