package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.dao.DetailsDAO;
import in.riyajivani.resumebuilder.resumebuilder.model.Details;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DetailServiceImpl implements DetailService{

    @Autowired
    private DetailsDAO detailsDAO;


    @Override @Transactional
    public void saveDetails(Details details) {detailsDAO.saveDetails(details);
    }

    @Override
    public Details getDetails(int id) {
        return detailsDAO.getDetails(id);
    }
}
