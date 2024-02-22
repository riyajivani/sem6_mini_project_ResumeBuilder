package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.model.Template;

import java.util.List;

public interface TemplateService {
    List<Template> getTemplates();

    void addTemplate(Template tmp);

    Template getTmpByName(String name);

    int getIdByName(String name);

    void deleteById(int id);
}
