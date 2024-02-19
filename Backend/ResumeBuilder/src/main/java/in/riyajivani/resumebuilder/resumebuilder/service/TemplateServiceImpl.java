package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.dao.TemplateDAO;
import in.riyajivani.resumebuilder.resumebuilder.model.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TemplateServiceImpl implements TemplateService{

    @Autowired
    private TemplateDAO templateDAO;
    @Override @Transactional
    public List<Template> getTemplates() {
       return templateDAO.getTemplates();
    }

    @Override @Transactional
    public void addTemplate(Template tmp) {
        templateDAO.addTemplate(tmp);
    }

    @Override @Transactional
    public Template getTmpByName(String name) {

        return templateDAO.getTmpByName(name);
    }

    @Override @Transactional
    public int getIdByName(String name){
        return templateDAO.getIdByName(name);
    }
}
