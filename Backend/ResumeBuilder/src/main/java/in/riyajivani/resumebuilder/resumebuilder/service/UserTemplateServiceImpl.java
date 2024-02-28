package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.dao.UserTemplateDAO;
import in.riyajivani.resumebuilder.resumebuilder.model.Template;
import in.riyajivani.resumebuilder.resumebuilder.model.User;
import in.riyajivani.resumebuilder.resumebuilder.model.UserTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserTemplateServiceImpl implements UserTemplateService{

    @Autowired
    private UserTemplateDAO userTemplateDAO;
    @Override @Transactional
    public void addUserTemplate(int userId, Template template) {
        userTemplateDAO.addUserTemplate(userId, template);
    }

    @Override @Transactional
    public List<Template> getUserTemplates(int userId) {
        return userTemplateDAO.getUserTemplates(userId);
    }

    @Override
    public UserTemplate getUserTemplateByUserAndTemplate(User user, Template template) {
        return userTemplateDAO.getUserTemplateByUserAndTemplate(user,template);
    }
}
