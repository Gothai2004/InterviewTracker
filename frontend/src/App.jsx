import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

    const [problems, setProblems] = useState([]);

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [status, setStatus] = useState("Pending");

    const [editingId, setEditingId] = useState(null);

    // Search
    const [search, setSearch] = useState("");

    // Filters
    const [difficultyFilter, setDifficultyFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [topicFilter, setTopicFilter] = useState("All");

    // Get all problems
    const fetchProblems = () => {
        axios
            .get("http://localhost:8080/problems")
            .then((response) => {
                setProblems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching problems:", error);
            });
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    // Clear form
    const clearForm = () => {
        setTitle("");
        setTopic("");
        setDifficulty("Easy");
        setStatus("Pending");
        setEditingId(null);
    };

    // Add or Update
    const saveProblem = () => {

        const problemData = {
            title: title,
            topic: topic,
            difficulty: difficulty,
            status: status
        };

        if (editingId !== null) {

            axios
                .put(
                    `http://localhost:8080/problems/${editingId}`,
                    problemData
                )
                .then(() => {
                    clearForm();
                    fetchProblems();
                })
                .catch((error) => {
                    console.error("Error updating problem:", error);
                });

        } else {

            axios
                .post(
                    "http://localhost:8080/problems",
                    problemData
                )
                .then(() => {
                    clearForm();
                    fetchProblems();
                })
                .catch((error) => {
                    console.error("Error adding problem:", error);
                });
        }
    };

    // Edit
    const editProblem = (problem) => {

        setEditingId(problem.id);

        setTitle(problem.title);
        setTopic(problem.topic);
        setDifficulty(problem.difficulty);
        setStatus(problem.status);
    };

    // Delete
    const deleteProblem = (id) => {

        axios
            .delete(`http://localhost:8080/problems/${id}`)
            .then(() => {

                setProblems(
                    problems.filter((problem) => problem.id !== id)
                );

            })
            .catch((error) => {
                console.error("Error deleting problem:", error);
            });
    };

    // Search + Filters
    const filteredProblems = problems.filter((problem) => {

        const matchesSearch = problem.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesDifficulty =
            difficultyFilter === "All" ||
            problem.difficulty === difficultyFilter;

        const matchesStatus =
            statusFilter === "All" ||
            problem.status === statusFilter;

        const matchesTopic =
            topicFilter === "All" ||
            problem.topic === topicFilter;

        return (
            matchesSearch &&
            matchesDifficulty &&
            matchesStatus &&
            matchesTopic
        );
    });

    // Get unique topics
    const topics = [
        "All",
        ...new Set(problems.map((problem) => problem.topic))
    ];

    // =========================
    // Dashboard calculations
    // =========================

    const totalProblems = problems.length;

    const completedProblems = problems.filter(
        (problem) => problem.status === "Completed"
    ).length;

    const pendingProblems = problems.filter(
        (problem) => problem.status === "Pending"
    ).length;

    const inProgressProblems = problems.filter(
        (problem) => problem.status === "In Progress"
    ).length;

    const easyProblems = problems.filter(
        (problem) => problem.difficulty === "Easy"
    ).length;

    const mediumProblems = problems.filter(
        (problem) => problem.difficulty === "Medium"
    ).length;

    const hardProblems = problems.filter(
        (problem) => problem.difficulty === "Hard"
    ).length;

    const completionPercentage =
        totalProblems === 0
            ? 0
            : Math.round(
                (completedProblems / totalProblems) * 100
            );

    // Status badge class
    const getStatusClass = (status) => {

        if (status === "Completed") {
            return "status-badge status-completed";
        }

        if (status === "Pending") {
            return "status-badge status-pending";
        }

        return "status-badge status-progress";
    };

    return (
        <div className="app">

            {/* =========================
          HEADER
      ========================= */}

            <h1>Interview Tracker</h1>

            <p className="subtitle">
                Track your coding problems and interview preparation.
            </p>


            {/* =========================
          DASHBOARD
      ========================= */}

            <div className="dashboard">

                <h2>Dashboard</h2>

                <div className="dashboard-grid">

                    <div className="stat-card">
                        <h3>Total Problems</h3>
                        <p>{totalProblems}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Completed</h3>
                        <p>{completedProblems}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Pending</h3>
                        <p>{pendingProblems}</p>
                    </div>

                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <p>{inProgressProblems}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Easy</h3>
                        <p>{easyProblems}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Medium</h3>
                        <p>{mediumProblems}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Hard</h3>
                        <p>{hardProblems}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Completion</h3>
                        <p>{completionPercentage}%</p>
                    </div>

                </div>


                {/* Progress */}

                <div className="progress-container">

                    <h3>Overall Progress</h3>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${completionPercentage}%`
                            }}
                        >
                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
          ADD / EDIT FORM
      ========================= */}

            <div className="form-section">

                <h2>
                    {editingId !== null
                        ? "Edit Problem"
                        : "Add New Problem"}
                </h2>

                <div className="form-grid">

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />

                    {/* Difficulty */}

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    {/* Status */}

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                </div>

                <br />

                <button
                    className="primary-button"
                    onClick={saveProblem}
                >
                    {editingId !== null
                        ? "Update Problem"
                        : "Add Problem"}
                </button>

                {editingId !== null && (
                    <button
                        className="secondary-button"
                        onClick={clearForm}
                    >
                        Cancel
                    </button>
                )}

            </div>


            {/* =========================
          SEARCH & FILTER
      ========================= */}

            <div className="filter-section">

                <h2>Search & Filter</h2>

                <div className="filter-grid">

                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={difficultyFilter}
                        onChange={(e) =>
                            setDifficultyFilter(e.target.value)
                        }
                    >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <select
                        value={topicFilter}
                        onChange={(e) =>
                            setTopicFilter(e.target.value)
                        }
                    >

                        {topics.map((topicName) => (
                            <option
                                key={topicName}
                                value={topicName}
                            >
                                {topicName === "All"
                                    ? "All Topics"
                                    : topicName}
                            </option>
                        ))}

                    </select>

                </div>

            </div>


            {/* =========================
          PROBLEMS
      ========================= */}

            <h2>Problems</h2>

            {filteredProblems.length === 0 ? (

                <p>No problems found.</p>

            ) : (

                filteredProblems.map((problem) => (

                    <div
                        className="problem-card"
                        key={problem.id}
                    >

                        <h3>{problem.title}</h3>

                        <p className="problem-info">
                            <strong>Topic:</strong>{" "}
                            {problem.topic}
                        </p>

                        <p className="problem-info">
                            <strong>Difficulty:</strong>{" "}
                            {problem.difficulty}
                        </p>

                        <p className="problem-info">
                            <strong>Status:</strong>{" "}

                            <span className={getStatusClass(problem.status)}>
                {problem.status}
              </span>

                        </p>

                        <br />

                        <button
                            className="primary-button"
                            onClick={() => editProblem(problem)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-button"
                            onClick={() => deleteProblem(problem.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))

            )}

        </div>
    );
}

export default App;