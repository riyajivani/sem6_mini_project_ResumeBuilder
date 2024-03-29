package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.dao.SkillDAO;
import in.riyajivani.resumebuilder.resumebuilder.model.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SkillServiceImpl implements SkillService{

    @Autowired
    private SkillDAO skillDAO;
    @Override @Transactional
    public Skill saveSkill(String skillName) {
        return skillDAO.saveSkill(skillName);
    }

    @Override @Transactional
    public Skill findSkill(String name) {
        return skillDAO.findSkill(name);
    }
}
