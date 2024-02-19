package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Template;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TemplateDAO {

    List<Template> getTemplates();

    void addTemplate(Template tmp);

    Template getTmpByName(String name);

    int getIdByName(String name);
}
