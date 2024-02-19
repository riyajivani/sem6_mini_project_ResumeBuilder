package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import in.riyajivani.resumebuilder.resumebuilder.dao.UserDAO;

@Service // @Service annotation is used with classes that provide some business functionalities.
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDAO employeeDAO;
    @Override @Transactional
    public User getUserByEmail(String email) {

        return employeeDAO.getUserByEmail(email);
    }

    @Override @Transactional
    public void saveUser(User user) {
        employeeDAO.saveUser(user);
    }

    @Override @Transactional
    public User getUserById(int id){

        return employeeDAO.getUserById(id);
    }
}
