package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.model.Details;
import in.riyajivani.resumebuilder.resumebuilder.model.Experience;

import java.util.List;

public interface ExperienceService {

    void saveExperience(Experience experiences);
    List<Experience> getExperience(int id);
}
