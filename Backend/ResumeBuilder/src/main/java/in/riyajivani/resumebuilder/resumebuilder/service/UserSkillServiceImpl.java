package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.dao.SkillDAO;
import in.riyajivani.resumebuilder.resumebuilder.dao.UserDAO;
import in.riyajivani.resumebuilder.resumebuilder.dao.UserSkillDAO;
import in.riyajivani.resumebuilder.resumebuilder.model.Skill;
import in.riyajivani.resumebuilder.resumebuilder.model.User;
import in.riyajivani.resumebuilder.resumebuilder.model.UserSkill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserSkillServiceImpl implements UserSkillService{

    @Autowired
    private UserSkillDAO userSkillDAO;

    @Override @Transactional
    public void addUserSkills(int userId, List<String> skillNames)
    {
        userSkillDAO.addUserSkills(userId,skillNames);
    }

    @Override @Transactional
    public List<String> getUserSkills(int userId)
    {
        return userSkillDAO.getUserSkills(userId);
    }
}
