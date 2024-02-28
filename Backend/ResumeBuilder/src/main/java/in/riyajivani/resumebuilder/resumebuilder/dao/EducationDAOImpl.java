package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Education;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EducationDAOImpl implements EducationDAO{

    @Autowired
    private EntityManager entityManager;

    @Override
    public void saveEducation(Education education) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(education);
    }

    @Override
    public List<Education> getEducation(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Education> query = currentSession.createQuery("from Education where user.id = :id", Education.class);
        query.setParameter("id", id);
        return query.list();
    }

    @Override
    public void deleteEducations(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<?> query = currentSession.createQuery("delete from Education where user.id = :userId");
        query.setParameter("userId", userId);
        query.executeUpdate();
    }
}
