package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Template;
import in.riyajivani.resumebuilder.resumebuilder.model.User;
import in.riyajivani.resumebuilder.resumebuilder.model.UserTemplate;

import java.util.List;

public interface UserTemplateDAO {

    public void addUserTemplate(int userId, Template template);

    List<Template> getUserTemplates(int userId);

    UserTemplate getUserTemplateByUserAndTemplate(User user, Template template);
}
