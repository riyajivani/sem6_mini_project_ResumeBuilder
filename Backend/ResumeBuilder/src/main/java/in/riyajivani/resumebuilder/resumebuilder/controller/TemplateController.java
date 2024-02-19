package in.riyajivani.resumebuilder.resumebuilder.controller;

import in.riyajivani.resumebuilder.resumebuilder.model.Template;
import in.riyajivani.resumebuilder.resumebuilder.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TemplateController {

    @Autowired
    private TemplateService templateService;

    @GetMapping("/gettemplate")
    public List<Template>getTemplates(){
        return templateService.getTemplates();
    }

    @PostMapping("/addtemplate")
    public ResponseEntity<Object> addTemplate(@RequestBody Template template){
        String tmpName = template.getName();

        if (templateService.getTmpByName(tmpName)==null) {
            templateService.addTemplate(template);
            int id = templateService.getIdByName(tmpName);
            return ResponseEntity.status(HttpStatus.CREATED).body(id);
        }
        else {
            String errorMessage = "Template with name '" + tmpName + "' already exists.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }
}
