package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.*;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserTemplateDAOImpl implements UserTemplateDAO{

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private TemplateDAO templateDAO;

    @Override
    public void addUserTemplate(int userId, Template template) {
        Session currentSession = entityManager.unwrap(Session.class);
        User user = userDAO.getUserById(userId);

        if (template != null) {
            Template existingTemplate = templateDAO.getTmpByName(template.getName());

            if(existingTemplate != null) {

                UserTemplate existingUserTemplate = getUserTemplateByUserAndTemplate(user, existingTemplate);

                if (existingUserTemplate == null) {
                    UserTemplate userTemplate = new UserTemplate();
                    userTemplate.setUser(user);
                    userTemplate.setTemplate(existingTemplate);
                    currentSession.persist(userTemplate);
                } else {
                    System.out.println("UserTemplate already exists for user and template");
                }
            } else {
                System.out.println("template not exist for name: "+ template.getName());
            }
        }else {
            System.out.println("Invalid template provided");
        }
    }

    @Override
    public List<Template> getUserTemplates(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);

        return currentSession.createQuery(
                        "SELECT us.template FROM UserTemplate us WHERE us.user.id = :userId", Template.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Override
    public UserTemplate getUserTemplateByUserAndTemplate(User user, Template template) {
        return entityManager.createQuery("FROM UserTemplate WHERE user = :user AND template = :template", UserTemplate.class)
                .setParameter("user", user)
                .setParameter("template", template)
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);
    }

}
