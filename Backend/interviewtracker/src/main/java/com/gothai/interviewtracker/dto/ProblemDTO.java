package com.gothai.interviewtracker.dto;

import jakarta.validation.constraints.NotBlank;

public class ProblemDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Topic is required")
    private String topic;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    @NotBlank(message = "Status is required")
    private String status;

    public ProblemDTO() {
    }

    public ProblemDTO(String title, String topic, String difficulty, String status) {
        this.title = title;
        this.topic = topic;
        this.difficulty = difficulty;
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}