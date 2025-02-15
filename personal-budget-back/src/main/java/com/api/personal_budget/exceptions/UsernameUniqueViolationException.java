package com.api.personal_budget.exceptions;

public class UsernameUniqueViolationException extends RuntimeException {
  public UsernameUniqueViolationException(String message) {
    super(message);
  }
}
