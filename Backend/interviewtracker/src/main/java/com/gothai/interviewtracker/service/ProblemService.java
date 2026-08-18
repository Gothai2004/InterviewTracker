package com.gothai.interviewtracker.service;

import com.gothai.interviewtracker.dto.ProblemDTO;
import com.gothai.interviewtracker.entity.Problem;
import com.gothai.interviewtracker.exception.ProblemNotFoundException;
import com.gothai.interviewtracker.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    // Get all problems
    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    // Add a new problem using DTO
    public Problem saveProblem(ProblemDTO dto) {

        Problem problem = new Problem();

        problem.setTitle(dto.getTitle());
        problem.setTopic(dto.getTopic());
        problem.setDifficulty(dto.getDifficulty());
        problem.setStatus(dto.getStatus());

        return problemRepository.save(problem);
    }

    // Get problem by ID using DTO
    public ProblemDTO getProblemById(Long id) {

        Problem problem = problemRepository.findById(id)
                .orElseThrow(() ->
                        new ProblemNotFoundException(
                                "Problem with id " + id + " not found"
                        )
                );

        return new ProblemDTO(
                problem.getTitle(),
                problem.getTopic(),
                problem.getDifficulty(),
                problem.getStatus()
        );
    }

    // Update problem using DTO
    public Problem updateProblem(Long id, ProblemDTO dto) {

        Problem existingProblem = problemRepository.findById(id)
                .orElseThrow(() ->
                        new ProblemNotFoundException(
                                "Problem with id " + id + " not found"
                        )
                );

        existingProblem.setTitle(dto.getTitle());
        existingProblem.setTopic(dto.getTopic());
        existingProblem.setDifficulty(dto.getDifficulty());
        existingProblem.setStatus(dto.getStatus());

        return problemRepository.save(existingProblem);
    }

    // Delete problem
    public String deleteProblem(Long id) {

        if (!problemRepository.existsById(id)) {
            throw new ProblemNotFoundException(
                    "Problem with id " + id + " not found"
            );
        }

        problemRepository.deleteById(id);

        return "Problem deleted successfully";
    }

    // Search problems by topic
    public List<Problem> getProblemsByTopic(String topic) {
        return problemRepository.findByTopic(topic);
    }

    // Search problems by difficulty
    public List<Problem> getProblemsByDifficulty(String difficulty) {
        return problemRepository.findByDifficulty(difficulty);
    }

    // Search problems by status
    public List<Problem> getProblemsByStatus(String status) {
        return problemRepository.findByStatus(status);
    }
}