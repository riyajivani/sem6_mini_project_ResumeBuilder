package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Education;
import in.riyajivani.resumebuilder.resumebuilder.model.Skill;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SkillDAOImpl implements SkillDAO{

    @Autowired
    private EntityManager entityManager;

    @Override
    public Skill saveSkill(String skillName) {
        Session currentSession = entityManager.unwrap(Session.class);
        Skill skill = new Skill();
        skill.setSkill(skillName);
        currentSession.persist(skill);
        return skill;
    }

    @Override
    public Skill findSkill(String name) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Skill> query = currentSession.createQuery("from Skill where skill = :name", Skill.class);
        query.setParameter("name", name);
        List<Skill> skills = query.list();
        return skills.isEmpty() ? null : skills.get(0);
    }
}
