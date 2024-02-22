package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Template;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TemplateDAOImpl implements TemplateDAO{

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Template> getTemplates() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Template> query = currentSession.createQuery("from Template ",Template.class);
        return query.getResultList();
    }

    @Override
    public void addTemplate(Template tmp) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.persist(tmp);
    }

    @Override
    public Template getTmpByName(String name){
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Template> query = currentSession.createQuery("from Template where name =: name", Template.class);
        query.setParameter("name", name);
        return query.uniqueResult();
    }

    @Override
    public int getIdByName(String name) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Template> query = currentSession.createQuery("from Template where name =: name", Template.class);
        query.setParameter("name",name);
        Template template = query.uniqueResult();
        return (template != null) ? template.getTemplateId() : -1;
    }

    @Override
    public void deleteById(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Template tmp = currentSession.get(Template.class,id);
        currentSession.remove(tmp);
    }
}
