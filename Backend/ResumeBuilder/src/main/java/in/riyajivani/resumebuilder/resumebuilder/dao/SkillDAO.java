package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Skill;

import java.util.List;

public interface SkillDAO {
    Skill saveSkill(String skillName);

    Skill findSkill(String name);
}
