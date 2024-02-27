package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Skill;

import java.util.List;

public interface UserSkillDAO {

    public void addUserSkills(int userId, List<String> skillNames);

    List<String> getUserSkills(int userId);
}
