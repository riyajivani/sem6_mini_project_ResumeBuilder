package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.Details;

public interface DetailsDAO {

    void saveDetails(Details details);
    Details getDetails(int id);

    void deleteDetails(int userId);
}
