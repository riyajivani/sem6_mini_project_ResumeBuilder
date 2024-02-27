package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.model.Skill;
import in.riyajivani.resumebuilder.resumebuilder.model.UserSkill;

import java.util.List;

public interface UserSkillService {

    public void addUserSkills(int userId, List<String> skillNames);

    List<String> getUserSkills(int userId);

}
