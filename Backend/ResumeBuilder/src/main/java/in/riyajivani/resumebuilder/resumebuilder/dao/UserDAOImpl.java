package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.User;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository //@Repository annotation is used to indicate that the class provides the mechanism for storage, retrieval, search, update and delete operation on objects.
public class UserDAOImpl implements UserDAO{

    @Autowired
    private EntityManager entityManager;


    @Override
    public User getUserById(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.get(User.class,id);
    }

    @Override
    public User getUserByEmail(String email)
    {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<User> query = currentSession.createQuery("from User where email = :email", User.class);
        query.setParameter("email", email);
        return query.uniqueResult();
    }

    @Override
    public void saveUser(User user) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(user);
    }
}
