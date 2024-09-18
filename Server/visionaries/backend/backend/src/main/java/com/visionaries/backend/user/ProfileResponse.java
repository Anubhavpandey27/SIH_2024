package com.visionaries.backend.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ProfileResponse {

    String email;
    String firstname;
    String lastname;
    String skills;
    String college;
    String position;
    int projects;
    float rating;
    String image;
    Boolean status;
}
