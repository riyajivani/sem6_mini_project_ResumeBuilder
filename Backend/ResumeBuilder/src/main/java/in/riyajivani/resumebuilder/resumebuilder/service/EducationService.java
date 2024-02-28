package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.model.Education;

import java.util.List;

public interface EducationService {

    void saveEducation(Education education);

    List<Education> getEducation(int id);

    void deleteEducations(int userId);

}
