# 📝 Git Commands Log - ACA Quiz App

This document tracks the Git commands used during development by Team Delta.

> ⚠️ **Before submitting:** the entries below were drafted from memory/notes. Double-check dates, exact commit messages, and PR numbers against your actual GitHub history (Insights → Commits, and the Pull Requests tab) and correct anything that doesn't match — this log should reflect what really happened, not an approximation.

---

## 📋 Purpose

1. Raw material for writing Git quiz questions
2. Workflow visibility for leads during code reviews
3. A learning reference for the team

---

## Commands Used, By Category

### Setup & branching
```bash
git clone git@github.com:tahleho3968/quiz-app-starter.git
cd quiz-app-starter
git status
git branch
git checkout -b feature/branch-name
git checkout master
```

### Staging & committing
```bash
git add .
git add src/App.tsx src/components/ResultCard.tsx   # stage specific files
git commit -m "feat: Add review screen and improve result UI"
```

### Syncing with remote
```bash
git pull origin master
git push origin feature/branch-name
git push -u origin feature/branch-name               # first push of a new branch
```

### Merging & cleanup
```bash
git merge feature/branch-name
git push origin master
git branch -d feature/branch-name                    # delete local branch
git push origin --delete feature/branch-name          # delete remote branch
```

### Inspecting history
```bash
git log --oneline
git diff
```

---

## Branches Created

```
master (main branch)
feature/better-results-page
feature/complete-quiz-app
feature/category-difficulty-filters
```

*(Add/remove from this list to match your actual branch history — check `git branch -a` or the Branches tab on GitHub.)*

---

## Pull Requests

Fill this in with your real PR numbers and links from the GitHub Pull Requests tab — the app requires at least 2 merged PRs, and you'll want the exact numbers for your submission.

| PR # | Branch | Description | Status |
|------|--------|-------------|--------|
| | | | |
| | | | |

---

## 💡 Lessons Learned

### Best Practices
1. **Always pull before branching**
   ```bash
   git checkout master
   git pull origin master
   git checkout -b feature/new-feature
   ```
2. **Commit often with clear messages** — conventional commit format (`type: description`), keep commits focused
3. **Descriptive branch names** — `feature/add-game-modes`, not `feature/new-stuff`
4. **Self-review before requesting PR review** — run `npm run build` and `npm run lint` first
5. **Delete branches after merging** to keep the repo clean

### Common Mistakes to Avoid
- Committing without `git add`
- Pushing to the wrong branch
- Forgetting to pull before starting work
- Vague commit messages like "update" or "fix"
- Merging without checking CI status first

### Merge Conflict Resolution
```bash
git merge feature/other-branch
# fix conflicts in the affected files
git add <resolved-file>
git commit -m "merge: resolve conflicts between branches"
git push origin master
```

---

## 🔗 Useful Git Resources

- [Git Cheat Sheet (PDF)](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Team Delta - Africa Code Academy Orientation Week 2026**