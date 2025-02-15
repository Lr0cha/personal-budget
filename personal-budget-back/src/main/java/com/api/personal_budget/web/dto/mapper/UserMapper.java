package com.api.personal_budget.web.dto.mapper;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.web.dto.UserCreateDto;
import com.api.personal_budget.web.dto.UserResponseDto;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {
    public static User toUser(UserCreateDto createDto) {
        return new ModelMapper().map(createDto, User.class);
    }

    public static UserResponseDto toDto(User user) {
        return new ModelMapper().map(user, UserResponseDto.class);
    }

    public static List<UserResponseDto> toListDto(List<User> users){
        return users.stream().map(UserMapper::toDto).collect(Collectors.toList());
    }
}
