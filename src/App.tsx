import { useEffect, useMemo, useRef, useState } from "react";
import allQuestions from "./data/questions";
import { QuestionCard } from "./components/QuestionCard";
import { ResultCard } from "./components/ResultCard";
import { SetupScreen } from "./components/SetupScreen";
import { ReviewScreen } from "./components/ReviewScreen";
import { DIFFICULTY_POINTS, DIFFICULTY_TIME_LIMIT } from "./types/quiz";
import type {
  Category,
  Difficulty,
  LeaderboardEntry,
  Question,
} from "./types/quiz";
import "./App.css";

const LEADERBOARD_KEY = "aca_quiz_leaderboard";
const TRANSITION_MS = 1200;
const MAX_LEADERBOARD_ENTRIES = 50;

const ALL_CATEGORIES: Category[] = Array.from(
  new Set(allQuestions.map((q) => q.category)),
) as Category[];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns a copy of the question with its options shuffled and
 * `correctAnswer` remapped to point at the new position of the right option.
 */
function shuffleQuestionOptions(question: Question): Question {
  const indices = shuffle(question.options.map((_, i) => i));
  const options = indices.map((i) => question.options[i]);
  const correctAnswer = indices.indexOf(question.correctAnswer);
  return { ...question, options, correctAnswer };
}

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

type Screen = "setup" | "playing" | "finished" | "review";

interface AnswerRecord {
  question: Question;
  selectedIndex: number | null;
  correct: boolean;
}

function App() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    loadLeaderboard(),
  );

  // --- Run configuration ---
  const [playerName, setPlayerName] = useState("Player");
  const [selectedCategories, setSelectedCategories] =
    useState<Category[]>(ALL_CATEGORIES);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">(
    "all",
  );

  // --- Active run state ---
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  const [timedOut, setTimedOut] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [score, setScore] = useState(0);
  const [timeBonusTotal, setTimeBonusTotal] = useState(0);
  const [streakBonusTotal, setStreakBonusTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [lastRank, setLastRank] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestion = quizQuestions[currentIndex];
  const timeLimit = currentQuestion
    ? DIFFICULTY_TIME_LIMIT[currentQuestion.difficulty]
    : 0;

  const questionCounts = useMemo(() => {
    const counts = {} as Record<Category, number>;
    for (const category of ALL_CATEGORIES) {
      counts[category] = allQuestions.filter(
        (q) => q.category === category,
      ).length;
    }
    return counts;
  }, []);

  // --- Countdown timer for the active question ---
  useEffect(() => {
    if (screen !== "playing" || !currentQuestion) return;
    if (selectedAnswerIndex !== null || timedOut || isTransitioning) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen, currentIndex, selectedAnswerIndex, timedOut, isTransitioning]);

  // When a question times out with no answer, record it as incorrect and break the streak.
  useEffect(() => {
    if (!timedOut || !currentQuestion) return;
    setStreak(0);
  setAnswers((prev) => [
    ...prev,
    { question: currentQuestion, selectedIndex: null, correct: false },
  ]);
  }, [timedOut]);

  const startQuiz = (
    categories: Category[],
    difficulty: Difficulty | "all",
    name: string,
  ) => {
    const pool = allQuestions.filter(
      (q) =>
        categories.includes(q.category) &&
        (difficulty === "all" || q.difficulty === difficulty),
    );
    const runQuestions = shuffle(pool.length > 0 ? pool : allQuestions).map(shuffleQuestionOptions,);

    setPlayerName(name);
    setSelectedCategories(categories);
    setDifficultyFilter(difficulty);
    setQuizQuestions(runQuestions);
    setCurrentIndex(0);
    setSelectedAnswerIndex(null);
    setTimedOut(false);
    setIsTransitioning(false);
    setScore(0);
    setTimeBonusTotal(0);
    setStreakBonusTotal(0);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
    setAnswers([]);
    setTimeLeft(DIFFICULTY_TIME_LIMIT[runQuestions[0].difficulty]);
    setLastRank(null);
    setScreen("playing");
  };

  const handleOptionClick = (optionIndex: number) => {
    if (selectedAnswerIndex !== null || timedOut || isTransitioning) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswerIndex(optionIndex);

  const isCorrect = optionIndex === currentQuestion.correctAnswer;
  setAnswers((prev) => [
    ...prev,
    {
      question: currentQuestion,
      selectedIndex: optionIndex,
      correct: isCorrect,
    },
  ]);

    if (isCorrect) {
      const basePoints = DIFFICULTY_POINTS[currentQuestion.difficulty];
      const speedBonus = Math.round((timeLeft / timeLimit) * basePoints * 0.5);
      const nextStreak = streak + 1;
      const streakBonus =
        nextStreak >= 3 ? 25 * Math.min(nextStreak - 2, 10) : 0;

      setScore((prev) => prev + basePoints + speedBonus + streakBonus);
      setTimeBonusTotal((prev) => prev + speedBonus);
      setStreakBonusTotal((prev) => prev + streakBonus);
      setCorrectCount((prev) => prev + 1);
      setStreak(nextStreak);
      setBestStreak((prev) => Math.max(prev, nextStreak));
    } else {
      setStreak(0);
    }
  };

  const finishQuiz = () => {
    const entry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: playerName,
      score,
      correct: correctCount,
      total: quizQuestions.length,
      bestStreak,
      categories:
        selectedCategories.length === ALL_CATEGORIES.length
          ? "All"
          : selectedCategories.join(", "),
      difficulty: difficultyFilter === "all" ? "All" : difficultyFilter,
      date: new Date().toISOString(),
    };

    const updated = [...leaderboard, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_LEADERBOARD_ENTRIES);

    setLeaderboard(updated);
    saveLeaderboard(updated);
    setLastRank(updated.findIndex((e) => e.id === entry.id) + 1);
    setScreen("finished");
  };

  const handleNextClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedAnswerIndex(null);
      setTimedOut(false);

      if (currentIndex + 1 < quizQuestions.length) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setTimeLeft(DIFFICULTY_TIME_LIMIT[quizQuestions[nextIndex].difficulty]);
        setIsTransitioning(false);
      } else {
        setIsTransitioning(false);
        finishQuiz();
      }
    }, TRANSITION_MS);
  };

  const handleRestartSameSetup = () => {
    startQuiz(selectedCategories, difficultyFilter, playerName);
  };

  const handleChangeSettings = () => {
    setScreen("setup");
  };

  const handleShowReview = () => {
    setScreen("review");
  };

  const handleBackToResults = () => {
    setScreen("finished");
  };

  const categoryBreakdown = useMemo(() => {
    const byCategory = new Map<Category, { correct: number; total: number }>();
    for (const answer of answers) {
      const category = answer.question.category;
      const entry = byCategory.get(category) ?? {
        correct: 0,
        total: 0,
      };
      entry.total += 1;
      if (answer.correct) entry.correct += 1;
      byCategory.set(category, entry);
    }
    return Array.from(byCategory.entries()).map(([category, stats]) => ({
      category,
      correct: stats.correct,
      total: stats.total,
    }));
  }, [answers]);

  if (screen === "setup") {
    return (
      <div className="app">
        <SetupScreen
          categories={ALL_CATEGORIES}
          questionCounts={questionCounts}
          leaderboard={leaderboard}
          onStart={startQuiz}
        />
      </div>
    );
  }

  if (screen === "finished") {
    return (
      <div className="app">
        <ResultCard
          score={score}
          correctCount={correctCount}
          totalQuestions={quizQuestions.length}
          bestStreak={bestStreak}
          timeBonus={timeBonusTotal}
          streakBonus={streakBonusTotal}
          rank={lastRank}
          playerName={playerName}
          categoryBreakdown={categoryBreakdown}
          onRestart={handleRestartSameSetup}
          onChangeSettings={handleChangeSettings}
          onReview={handleShowReview}
        />
      </div>
    );
  }

  if (screen === "review") {
    return (
      <div className="app">
        <ReviewScreen answers={answers} onBack={handleBackToResults} />
      </div>
    );
  }

  if (!currentQuestion) return null;

  const hasAnswered = selectedAnswerIndex !== null || timedOut;

  return (
    <div className="app">
      <header className="quiz-header">
        <h1>ACA Orientation Quiz</h1>
        <div className="progress-tracker">
          Question <strong>{currentIndex + 1}</strong> of {quizQuestions.length}
        </div>
      </header>

      <div className="score-strip">
        <span className="score-strip-item">Score: {score}</span>
        <span className="score-strip-item">
          Correct: {correctCount}/{answers.length}
        </span>
      </div>

      <span className="category-tag">
        {currentQuestion.category.toUpperCase()}
      </span>

      <QuestionCard
        key={currentIndex}
        currentQuestion={currentQuestion}
        selectedAnswerIndex={selectedAnswerIndex}
        onOptionClick={handleOptionClick}
        isTransitioning={isTransitioning}
        timeLeft={timeLeft}
        timeLimit={timeLimit}
        streak={streak}
        timedOut={timedOut}
        currentQuestionIndex={currentIndex}
        totalQuestions={quizQuestions.length}
      />

      {hasAnswered && !isTransitioning && (
        <div className="feedback-box">
          <p className="feedback-status">
            {timedOut
              ? "⏱️ Time's up"
              : selectedAnswerIndex === currentQuestion.correctAnswer
                ? "✅ Correct!"
                : "❌ Incorrect"}
          </p>
          <p className="explanation-text">{currentQuestion.explanation}</p>
          <button className="btn next-btn" onClick={handleNextClick}>
            {currentIndex + 1 === quizQuestions.length
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;