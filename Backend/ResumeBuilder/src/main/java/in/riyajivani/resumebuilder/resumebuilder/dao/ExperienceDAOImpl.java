package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Details;
import in.riyajivani.resumebuilder.resumebuilder.model.Experience;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ExperienceDAOImpl implements ExperienceDAO{

    @Autowired
    private EntityManager entityManager;

    @Override
    public void saveExperience(Experience experience) {
        Session currentSession = entityManager.unwrap(Session.class);
            currentSession.persist(experience);
    }

    @Override
    public List<Experience> getExperience(int id) {

        Session currentSession = entityManager.unwrap(Session.class);
        Query<Experience> query = currentSession.createQuery("from Experience where user.id = :id", Experience.class);
        query.setParameter("id", id);
        return query.list();
    }
}
