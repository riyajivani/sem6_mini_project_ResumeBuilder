package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Skill;
import in.riyajivani.resumebuilder.resumebuilder.model.User;
import in.riyajivani.resumebuilder.resumebuilder.model.UserSkill;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserSkillDAOImpl implements UserSkillDAO {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private SkillDAO skillDAO;

    @Override
    public void addUserSkills(int userId, List<String> skillNames) {
        Session currentSession = entityManager.unwrap(Session.class);

        User user = userDAO.getUserById(userId);

        for (String skillName : skillNames) {
            Skill skill = skillDAO.findSkill(skillName);

            if (skill==null){
               skill =  skillDAO.saveSkill(skillName);
            }

            UserSkill userSkill = new UserSkill();
            userSkill.setUser(user);
            userSkill.setSkill(skill);
            currentSession.persist(userSkill);

        }
    }

    @Override
    public List<String> getUserSkills(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);

        return currentSession.createQuery(
                        "SELECT us.skill.skill FROM UserSkill us WHERE us.user.id = :userId", String.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
