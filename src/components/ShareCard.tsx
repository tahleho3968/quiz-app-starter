import { useState } from "react";
import type { Question } from "../types/quiz";

interface AnswerRecord {
  question: Question;
  selectedIndex: number | null;
  correct: boolean;
}

interface ShareCardProps {
  answers: AnswerRecord[];
  score: number;
  totalQuestions: number;
  playerName: string;
  mode?: string;
}

export function ShareCard({ answers, score, totalQuestions, playerName, mode = "Classic" }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const date = new Date().toLocaleDateString();

    // Wordle-style grid: 🟩 = correct, 🟥 = wrong, ⬜ = skipped/timed out
    const grid = answers.map((answer) => {
      if (answer.correct) return "🟩";
      if (answer.selectedIndex !== null) return "🟥";
      return "⬜";
    }).join("");

    // Group grid into rows of 5 for readability
    const gridRows = grid.match(/.{1,5}/g)?.join("\n") || grid;

    // Count how many of each
    const correctCount = answers.filter(a => a.correct).length;
    const wrongCount = answers.filter(a => a.selectedIndex !== null && !a.correct).length;
    const skippedCount = answers.filter(a => a.selectedIndex === null).length;

    return `🏆 ACA Quiz Challenge - ${date}

${playerName} scored ${score}/${totalQuestions} (${percentage}%)

${gridRows}

🟩 Correct: ${correctCount}
🟥 Wrong: ${wrongCount}
⬜ Skipped: ${skippedCount}

Mode: ${mode}
Can you beat my score? 🎯
#ACAQuiz #TeamDelta`;
  };

  const handleCopy = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="share-card card">
      <h3>📤 Share Your Result</h3>
      <p className="share-subtitle">Copy and paste this in your group chat!</p>

      <div className="share-preview">
        <pre className="share-text">{generateShareText()}</pre>
      </div>

      <button className="btn share-btn" onClick={handleCopy}>
        {copied ? "✅ Copied!" : "📋 Copy to Clipboard"}
      </button>
    </div>
  );
}