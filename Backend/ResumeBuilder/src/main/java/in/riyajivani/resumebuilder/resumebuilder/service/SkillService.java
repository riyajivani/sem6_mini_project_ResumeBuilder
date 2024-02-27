package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.model.Skill;

import java.util.List;

public interface SkillService {

    Skill saveSkill(String skillName);

    Skill findSkill(String name);
}
