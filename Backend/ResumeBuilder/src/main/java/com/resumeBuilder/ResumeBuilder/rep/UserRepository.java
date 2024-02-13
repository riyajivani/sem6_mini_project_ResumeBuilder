package com.resumeBuilder.ResumeBuilder.rep;

import com.resumeBuilder.ResumeBuilder.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String>
{

}
