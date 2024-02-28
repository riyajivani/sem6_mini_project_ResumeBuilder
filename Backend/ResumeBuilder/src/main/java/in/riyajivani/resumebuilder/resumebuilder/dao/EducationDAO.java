package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Education;
import in.riyajivani.resumebuilder.resumebuilder.model.Experience;

import java.util.List;

public interface EducationDAO {

    void saveEducation(Education education);

    List<Education> getEducation(int id);

    void deleteEducations(int userId);
}
