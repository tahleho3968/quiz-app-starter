import { useEffect, useMemo, useRef, useState } from "react";
import allQuestions from "./data/questions";
import { QuestionCard } from "./components/QuestionCard";
import { ResultCard } from "./components/ResultCard";
import { SetupScreen } from "./components/SetupScreen";
import { ReviewScreen } from "./components/ReviewScreen";
import { ShareCard } from "./components/ShareCard";
import { BadgeToast } from "./components/BadgeToast";
import { useBadges } from "./hooks/useBadges";
import { seededShuffle, getDailySeed } from "./utils/seededRandom";
import { DIFFICULTY_POINTS, DIFFICULTY_TIME_LIMIT } from "./types/quiz";
import type {
  Category,
  Difficulty,
  GameMode,
  LeaderboardEntry,
  Question,
} from "./types/quiz";
import "./App.css";

const LEADERBOARD_KEY = "aca_quiz_leaderboard";
const SESSION_KEY = "aca_quiz_session";
const TRANSITION_MS = 1200;
const MAX_LEADERBOARD_ENTRIES = 50;
const TIMED_MODE_LIMIT = 300; // 5 minutes

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
  timeToAnswer?: number;
}

// Everything needed to fully resume a quiz after a page refresh or a
// closed/reopened tab. Deliberately excludes `isTransitioning` and
// `questionStartTime` and `autoFinishPending` — those are short-lived
// animation/internal-timing flags that should always reset to a clean
// state on load rather than resume mid-transition.
interface SessionSnapshot {
  screen: Screen;
  gameMode: GameMode;
  playerName: string;
  selectedCategories: Category[];
  difficultyFilter: Difficulty | "all";
  quizQuestions: Question[];
  currentIndex: number;
  selectedAnswerIndex: number | null;
  timedOut: boolean;
  score: number;
  timeBonusTotal: number;
  streakBonusTotal: number;
  correctCount: number;
  streak: number;
  bestStreak: number;
  answers: AnswerRecord[];
  timeLeft: number;
  sessionTimeLeft: number;
  gameOver: boolean;
  answerTimes: number[];
  lastRank: number | null;
}

function loadSession(): SessionSnapshot | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionSnapshot;
    // Only worth restoring if there's an actual run in progress (or just
    // finished) with real questions loaded — anything else, start fresh.
    if (!parsed.quizQuestions || parsed.quizQuestions.length === 0) return null;
    if (parsed.screen === "setup") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveSession(snapshot: SessionSnapshot) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(snapshot));
  } catch {
    // localStorage can throw if it's full or unavailable (e.g. private
    // browsing in some browsers) — not fatal, progress just won't survive
    // a refresh in that specific case.
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function App() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    loadLeaderboard(),
  );

  // --- Badges ---
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    badges: _badges,
    newBadge,
    checkBadges,
    updateTotalAnswered,
    clearNewBadge,
    getUnlockedCount,
    getTotalBadges,
  } = useBadges();

  // --- Run configuration ---
  const [playerName, setPlayerName] = useState("Player");
  const [selectedCategories, setSelectedCategories] =
    useState<Category[]>(ALL_CATEGORIES);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">(
    "all",
  );
  const [gameMode, setGameMode] = useState<GameMode>("classic");

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
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
  const [lastRank, setLastRank] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [answerTimes, setAnswerTimes] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [autoFinishPending, setAutoFinishPending] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // --- Restore session on mount ---
  useEffect(() => {
    const saved = loadSession();
    if (saved) {
      setIsRestoring(true);
      // Restore all state from session
      setScreen(saved.screen);
      setGameMode(saved.gameMode);
      setPlayerName(saved.playerName);
      setSelectedCategories(saved.selectedCategories);
      setDifficultyFilter(saved.difficultyFilter);
      setQuizQuestions(saved.quizQuestions);
      setCurrentIndex(saved.currentIndex);
      setSelectedAnswerIndex(saved.selectedAnswerIndex);
      setTimedOut(saved.timedOut);
      setScore(saved.score);
      setTimeBonusTotal(saved.timeBonusTotal);
      setStreakBonusTotal(saved.streakBonusTotal);
      setCorrectCount(saved.correctCount);
      setStreak(saved.streak);
      setBestStreak(saved.bestStreak);
      setAnswers(saved.answers);
      setTimeLeft(saved.timeLeft);
      setSessionTimeLeft(saved.sessionTimeLeft);
      setGameOver(saved.gameOver);
      setAnswerTimes(saved.answerTimes);
      setLastRank(saved.lastRank);
      // Reset transient flags
      setIsTransitioning(false);
      setQuestionStartTime(Date.now());
      setAutoFinishPending(false);
      setIsRestoring(false);
    }
  }, []);

  // --- Save session whenever state changes ---
  useEffect(() => {
    // Don't save while restoring or on setup screen
    if (isRestoring) return;
    if (screen === "setup") {
      clearSession();
      return;
    }

    const snapshot: SessionSnapshot = {
      screen,
      gameMode,
      playerName,
      selectedCategories,
      difficultyFilter,
      quizQuestions,
      currentIndex,
      selectedAnswerIndex,
      timedOut,
      score,
      timeBonusTotal,
      streakBonusTotal,
      correctCount,
      streak,
      bestStreak,
      answers,
      timeLeft,
      sessionTimeLeft,
      gameOver,
      answerTimes,
      lastRank,
    };

    saveSession(snapshot);
  }, [
    screen,
    gameMode,
    playerName,
    selectedCategories,
    difficultyFilter,
    quizQuestions,
    currentIndex,
    selectedAnswerIndex,
    timedOut,
    score,
    timeBonusTotal,
    streakBonusTotal,
    correctCount,
    streak,
    bestStreak,
    answers,
    timeLeft,
    sessionTimeLeft,
    gameOver,
    answerTimes,
    lastRank,
    isRestoring,
  ]);

  // --- Tab close / refresh warning ---
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only show warning if a quiz is in progress (not finished, not setup)
      if (screen === "playing" && quizQuestions.length > 0) {
        // Standard way to show browser's native confirmation dialog
        e.preventDefault();
        e.returnValue =
          "⚠️ You have a quiz in progress! If you leave now, your progress will be saved but the timer will continue running. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [screen, quizQuestions.length]);

  // --- Session timer for Timed mode ---
  useEffect(() => {
    if (screen !== "playing" || gameMode !== "timed") return;
    if (sessionTimeLeft <= 0) {
      finishQuiz();
      return;
    }

    sessionTimerRef.current = setInterval(() => {
      setSessionTimeLeft((prev) => {
        if (prev <= 1) {
          if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, [screen, gameMode, sessionTimeLeft]);

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

  // When a question times out
  useEffect(() => {
    if (!timedOut || !currentQuestion) return;
    setStreak(0);
    const timeTaken = Date.now() - questionStartTime;
    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        selectedIndex: null,
        correct: false,
        timeToAnswer: timeTaken,
      },
    ]);
    setAnswerTimes((prev) => [...prev, timeTaken]);

    if (gameMode === "survival") {
      setGameOver(true);
      setAutoFinishPending(true);
    }
  }, [timedOut]);

  // Handles the delayed auto-finish for Survival mode timeouts
  useEffect(() => {
    if (!autoFinishPending) return;

    const timeout = setTimeout(() => {
      finishQuiz();
      setAutoFinishPending(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [autoFinishPending]);

  // --- Setup Quiz ---
  const startQuiz = (
    categories: Category[],
    difficulty: Difficulty | "all",
    name: string,
    mode: GameMode = "classic",
  ) => {
    // Clear any old session
    clearSession();

    setGameMode(mode);
    setPlayerName(name);
    setSelectedCategories(categories);
    setDifficultyFilter(difficulty);

    const filteredPool = allQuestions.filter(
      (q) =>
        categories.includes(q.category) &&
        (difficulty === "all" || q.difficulty === difficulty),
    );
    const safePool = filteredPool.length > 0 ? filteredPool : allQuestions;

    let runQuestions: Question[];

    switch (mode) {
      case "daily": {
        const seed = getDailySeed();
        runQuestions = seededShuffle(allQuestions, seed).map(
          shuffleQuestionOptions,
        );
        break;
      }
      case "marathon":
        runQuestions = shuffle(allQuestions).map(shuffleQuestionOptions);
        break;
      case "category-lock":
        runQuestions = shuffle(
          allQuestions.filter((q) => q.category === categories[0]),
        ).map(shuffleQuestionOptions);
        break;
      case "survival": {
        const easy = allQuestions.filter((q) => q.difficulty === "easy");
        const medium = allQuestions.filter((q) => q.difficulty === "medium");
        const hard = allQuestions.filter((q) => q.difficulty === "hard");
        runQuestions = shuffle([...easy, ...medium, ...hard]).map(
          shuffleQuestionOptions,
        );
        break;
      }
      case "timed":
        runQuestions = shuffle(safePool).map(shuffleQuestionOptions);
        break;
      case "classic":
      default:
        runQuestions = shuffle(safePool)
          .slice(0, 20)
          .map(shuffleQuestionOptions);
        break;
    }

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
    setAnswerTimes([]);
    setLastRank(null);
    setGameOver(false);
    setQuestionStartTime(Date.now());
    setTimeLeft(DIFFICULTY_TIME_LIMIT[runQuestions[0]?.difficulty ?? "easy"]);
    setSessionTimeLeft(mode === "timed" ? TIMED_MODE_LIMIT : 0);
    setScreen("playing");
  };

  const finishQuiz = () => {
    // Clear session when quiz is finished
    clearSession();

    const avgTime =
      answerTimes.length > 0
        ? answerTimes.reduce((a, b) => a + b, 0) / answerTimes.length / 1000
        : 0;

    let comeback = false;
    if (answers.length > 5) {
      const firstHalf = answers.slice(0, Math.floor(answers.length / 2));
      const secondHalf = answers.slice(Math.floor(answers.length / 2));
      const firstCorrect = firstHalf.filter((a) => a.correct).length;
      const secondCorrect = secondHalf.filter((a) => a.correct).length;
      if (firstCorrect < secondCorrect && secondCorrect > firstCorrect * 1.5) {
        comeback = true;
      }
    }

    const categoryBreakdown = getCategoryBreakdown();
    const perfectCategories = categoryBreakdown
      .filter((c) => c.correct === c.total && c.total >= 3)
      .map((c) => c.category);

    checkBadges({
      score,
      correctCount,
      totalQuestions: quizQuestions.length,
      bestStreak,
      averageTime: avgTime,
      categoryBreakdown,
      perfectCategories,
      comeback,
    });

    updateTotalAnswered(quizQuestions.length);

    const totalAttempted =
      gameMode === "survival" ? answers.length : quizQuestions.length;

    const entry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: playerName,
      score,
      correct: correctCount,
      total: totalAttempted,
      bestStreak,
      categories:
        selectedCategories.length === ALL_CATEGORIES.length
          ? "All"
          : selectedCategories.join(", "),
      difficulty: difficultyFilter === "all" ? "All" : difficultyFilter,
      date: new Date().toISOString(),
      mode: gameMode,
      avgTime: avgTime,
    };

    const updated = [...leaderboard, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_LEADERBOARD_ENTRIES);

    setLeaderboard(updated);
    saveLeaderboard(updated);
    setLastRank(updated.findIndex((e) => e.id === entry.id) + 1);
    setScreen("finished");
  };

  const handleOptionClick = (optionIndex: number) => {
    if (selectedAnswerIndex !== null || timedOut || isTransitioning || gameOver)
      return;
    if (timerRef.current) clearInterval(timerRef.current);

    const timeTaken = Date.now() - questionStartTime;
    setAnswerTimes((prev) => [...prev, timeTaken]);
    setSelectedAnswerIndex(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        selectedIndex: optionIndex,
        correct: isCorrect,
        timeToAnswer: timeTaken,
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
      if (gameMode === "survival") {
        setGameOver(true);
      }
    }
  };

  const getCategoryBreakdown = () => {
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
  };

  const handleNextClick = () => {
    if (isTransitioning || gameOver) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedAnswerIndex(null);
      setTimedOut(false);
      setQuestionStartTime(Date.now());

      if (currentIndex + 1 < quizQuestions.length) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        if (gameMode !== "timed") {
          setTimeLeft(
            DIFFICULTY_TIME_LIMIT[quizQuestions[nextIndex].difficulty],
          );
        } else {
          setTimeLeft(DIFFICULTY_TIME_LIMIT[quizQuestions[nextIndex].difficulty]);
        }
        setIsTransitioning(false);
      } else {
        setIsTransitioning(false);
        finishQuiz();
      }
    }, TRANSITION_MS);
  };

  const handleRestartSameSetup = () => {
    startQuiz(selectedCategories, difficultyFilter, playerName, gameMode);
  };

  const handleChangeSettings = () => {
    clearSession();
    setScreen("setup");
  };

  const handleShowReview = () => {
    setScreen("review");
  };

  const handleBackToResults = () => {
    setScreen("finished");
  };

  const categoryBreakdown = useMemo(() => getCategoryBreakdown(), [answers]);

  if (screen === "setup") {
    return (
      <div className="app">
        <SetupScreen
          categories={ALL_CATEGORIES}
          questionCounts={questionCounts}
          leaderboard={leaderboard}
          onStart={startQuiz}
          badgeCount={`${getUnlockedCount()}/${getTotalBadges()}`}
        />
        <BadgeToast badge={newBadge} onClose={clearNewBadge} />
      </div>
    );
  }

  if (screen === "finished") {
    const avgTime =
      answerTimes.length > 0
        ? answerTimes.reduce((a, b) => a + b, 0) / answerTimes.length / 1000
        : 0;

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
          gameMode={gameMode}
          avgTime={avgTime}
          onRestart={handleRestartSameSetup}
          onChangeSettings={handleChangeSettings}
          onReview={handleShowReview}
        />
        <ShareCard
          answers={answers}
          score={correctCount}
          totalQuestions={quizQuestions.length}
          playerName={playerName}
          mode={gameMode}
        />
        <BadgeToast badge={newBadge} onClose={clearNewBadge} />
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

  if (gameOver) {
    return (
      <div className="app">
        <div className="card result-card">
          <h1>💀 Game Over!</h1>
          <p className="score-summary">
            You survived <strong>{answers.length}</strong> questions!
          </p>
          <p className="score-summary">
            Correct: <strong>{correctCount}</strong>
          </p>
          <button className="btn" onClick={finishQuiz}>
            See Results
          </button>
        </div>
      </div>
    );
  }

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
        {gameMode === "timed" && (
          <span className="score-strip-item">⏱️ {sessionTimeLeft}s</span>
        )}
        {gameMode === "survival" && (
          <span className="score-strip-item">💀 Survival Mode</span>
        )}
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