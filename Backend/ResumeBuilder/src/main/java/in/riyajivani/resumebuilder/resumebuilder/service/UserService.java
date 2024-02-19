package in.riyajivani.resumebuilder.resumebuilder.service;

import in.riyajivani.resumebuilder.resumebuilder.model.User;

public interface UserService {

    User getUserByEmail(String email);

    void saveUser(User user);

    User getUserById(int id);
}
