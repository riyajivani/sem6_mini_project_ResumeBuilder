package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Details;
import in.riyajivani.resumebuilder.resumebuilder.model.User;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DetailsDAOImpl implements DetailsDAO{

    @Autowired
    private EntityManager entityManager;
    @Override
    public void saveDetails(Details details) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(details);
    }

    @Override
    public Details getDetails(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Details> query = currentSession.createQuery("from Details where user.id = :id", Details.class);
        query.setParameter("id", id);
        return query.uniqueResult();
    }

    @Override
    public void deleteDetails(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<?> query = currentSession.createQuery("delete from Details where user.id = :userId");
        query.setParameter("userId", userId);
        query.executeUpdate();
    }
}
