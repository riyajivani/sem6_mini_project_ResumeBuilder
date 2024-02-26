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
    public void saveSkill(Skill skill) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(skill);
    }

    @Override
    public List<Skill> getSkill(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Skill> query = currentSession.createQuery("from Skill where user.id = :id", Skill.class);
        query.setParameter("id", id);
        return query.list();
    }
}
