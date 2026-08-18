package com.gothai.interviewtracker.controller;

import com.gothai.interviewtracker.dto.ProblemDTO;
import com.gothai.interviewtracker.entity.Problem;
import com.gothai.interviewtracker.service.ProblemService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/problems")
@CrossOrigin(origins = "http://localhost:5173")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    // Get all problems
    @GetMapping
    public List<Problem> getAllProblems() {
        return problemService.getAllProblems();
    }

    // Add a new problem using DTO + Validation
    @PostMapping
    public Problem saveProblem(@Valid @RequestBody ProblemDTO problemDTO) {
        return problemService.saveProblem(problemDTO);
    }

    // Get problem by ID using DTO
    @GetMapping("/{id}")
    public ProblemDTO getProblemById(@PathVariable Long id) {
        return problemService.getProblemById(id);
    }

    // Update problem using DTO + Validation
    @PutMapping("/{id}")
    public Problem updateProblem(
            @PathVariable Long id,
            @Valid @RequestBody ProblemDTO problemDTO) {

        return problemService.updateProblem(id, problemDTO);
    }

    // Delete problem
    @DeleteMapping("/{id}")
    public String deleteProblem(@PathVariable Long id) {
        return problemService.deleteProblem(id);
    }

    // Get problems by topic
    @GetMapping("/topic/{topic}")
    public List<Problem> getProblemsByTopic(@PathVariable String topic) {
        return problemService.getProblemsByTopic(topic);
    }

    // Get problems by difficulty
    @GetMapping("/difficulty/{difficulty}")
    public List<Problem> getProblemsByDifficulty(
            @PathVariable String difficulty) {

        return problemService.getProblemsByDifficulty(difficulty);
    }

    // Get problems by status
    @GetMapping("/status/{status}")
    public List<Problem> getProblemsByStatus(
            @PathVariable String status) {

        return problemService.getProblemsByStatus(status);
    }
}