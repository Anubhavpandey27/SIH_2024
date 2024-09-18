package com.sih.visionaries.repository;

import com.sih.visionaries.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


public interface  UserRepository extends MongoRepository<User,Integer> {
    @Override
    <S extends User> S save(S entity);
}
