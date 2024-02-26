package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.model.Skill;

import java.util.List;

public interface SkillService {

    void saveSkill(Skill skill);

    List<Skill> getSkill(int id);
}
