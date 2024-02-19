package in.riyajivani.resumebuilder.resumebuilder.dao;

import in.riyajivani.resumebuilder.resumebuilder.model.User;

import java.util.List;

public interface UserDAO {

    User getUserByEmail(String email);

    User getUserById(int id);

    void saveUser(User user);
}
