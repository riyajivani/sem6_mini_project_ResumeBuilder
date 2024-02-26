package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.dao.EducationDAO;
import in.riyajivani.resumebuilder.resumebuilder.model.Education;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EducationServiceImpl implements EducationService{

    @Autowired
    private EducationDAO educationDAO;

    @Override @Transactional
    public void saveEducation(Education education) {
        educationDAO.saveEducation(education);
    }

    @Override @Transactional
    public List<Education> getEducation(int id) {
        return educationDAO.getEducation(id);
    }
}
