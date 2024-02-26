package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Skill;

import java.util.List;

public interface SkillDAO {
    void saveSkill(Skill skill);

    List<Skill> getSkill(int id);
}
