package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.model.Details;

public interface DetailService {

    void saveDetails(Details details);
    Details getDetails(int id);

    void deleteDetails(int userId);
}
