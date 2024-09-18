package com.sih.visionaries.model;

import jdk.jfr.DataAmount;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collection;
import java.util.Collections;



@Document(collection="user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter

public class User {
    @Id
    private Integer id;
    private  String email;
}
