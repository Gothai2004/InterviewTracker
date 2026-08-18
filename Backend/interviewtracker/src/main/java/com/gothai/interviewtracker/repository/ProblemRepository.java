package com.gothai.interviewtracker.repository;

import com.gothai.interviewtracker.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    List<Problem> findByTopic(String topic);

    List<Problem> findByDifficulty(String difficulty);

    List<Problem> findByStatus(String status);
}