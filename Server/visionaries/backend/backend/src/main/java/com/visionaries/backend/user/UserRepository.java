package com.visionaries.backend.user;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);
  List<User>findAllByCollege(String college);

  @Override
  <S extends User> S save(S entity);
}
