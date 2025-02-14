package com.api.personal_budget.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.util.TimeZone;

@Configuration
public class SpringTimezoneConfig {
    @PostConstruct
    private void timezoneConfig() {
        TimeZone.setDefault(TimeZone.getTimeZone("América/São_Paulo"));
    }
}
