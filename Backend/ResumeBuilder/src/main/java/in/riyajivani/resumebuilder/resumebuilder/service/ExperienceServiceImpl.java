package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.dao.ExperienceDAO;
import in.riyajivani.resumebuilder.resumebuilder.model.Details;
import in.riyajivani.resumebuilder.resumebuilder.model.Experience;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ExperienceServiceImpl implements ExperienceService{

    @Autowired
    private ExperienceDAO experienceDAO;

    @Override @Transactional
    public void saveExperience(Experience experiences) {
        experienceDAO.saveExperience(experiences);
    }

    @Override @Transactional
    public List<Experience> getExperience(int id) {
        return experienceDAO.getExperience(id);
    }
}
