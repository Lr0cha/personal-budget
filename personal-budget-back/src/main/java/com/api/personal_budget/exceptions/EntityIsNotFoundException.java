package com.api.personal_budget.exceptions;

public class EntityIsNotFoundException extends RuntimeException {
    public EntityIsNotFoundException(String message) {
        super(message);
    }
}
