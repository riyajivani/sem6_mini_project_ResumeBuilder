package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Details;
import in.riyajivani.resumebuilder.resumebuilder.model.Experience;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ExperienceDAO {

    void saveExperience(Experience experience);

    List<Experience> getExperience(int id);

}
