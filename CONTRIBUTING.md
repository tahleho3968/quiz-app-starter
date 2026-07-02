# 🤝 Contributing to ACA Quiz App

Thank you for your interest in contributing! This document outlines how to contribute to this project.

---

## 🎯 Our Philosophy

- **Learning by doing** — every contribution is a learning opportunity
- **Team collaboration** — we succeed together
- **Clean code** — code should be readable and maintainable
- **Quality over quantity** — well-crafted code beats rushed features

---

## 📋 Getting Started

```bash
# 1. Clone your fork
git clone https://github.com/YOUR-USERNAME/quiz-app-starter.git
cd quiz-app-starter

# 2. Install dependencies
npm install

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes, then commit
git add .
git commit -m "type: Brief description of changes"

# 5. Push and open a Pull Request
git push origin feature/your-feature-name
```

---

## 📝 Commit Message Guidelines

### Format
```
type: Brief description (50 chars max)

Optional longer description explaining the changes
```

### Types
| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: Add game mode selector` |
| `fix` | Bug fix | `fix: Resolve stale closure in survival mode` |
| `docs` | Documentation only | `docs: Update README` |
| `style` | Formatting only | `style: Format code with Prettier` |
| `refactor` | Code restructuring, no behavior change | `refactor: Simplify state logic` |
| `chore` | Maintenance tasks | `chore: Update dependencies` |

---

## 🌿 Branch Naming

Use kebab-case:

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/game-modes` |
| Bug fix | `fix/description` | `fix/timer-bug` |
| Docs | `docs/description` | `docs/update-readme` |

---

## 🔍 Code Review Process

### Self-Review Checklist (before opening a PR)
- [ ] `npm run dev` — runs without errors
- [ ] `npm run build` — passes
- [ ] `npm run lint` — passes with 0 errors
- [ ] No leftover `console.log` or debug code
- [ ] TypeScript types are properly defined
- [ ] Feature manually tested in the browser

### Peer Review
- At least one team member reviews before merge
- Address feedback, discuss constructively
- Merge after approval, delete the branch, pull `master` locally

> **Note:** there's currently no automated test suite configured for this project (no `npm run test` script, no test runner installed). Testing is manual — run the app locally and click through the change before opening a PR. Adding a test framework (e.g. Vitest) would be a good follow-up if the project continues past orientation week.

---

## 🎨 Code Style

### TypeScript
```typescript
// ✅ Good
interface User {
  id: number;
  name: string;
  email?: string;
}

// ❌ Avoid
interface User {
  id: any; // don't use `any`
  name: string;
}
```

### React
```tsx
// ✅ Functional components with hooks
export function QuestionCard({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  return <div>{/* JSX */}</div>;
}
```

### Formatting
- Run `npm run lint -- --fix` before committing to clean up Prettier warnings
- 2-space indentation
- Double quotes for strings (matches this project's existing Prettier config)

*(This project doesn't currently have a pre-commit hook like Husky set up — if you want one, it'd need to be added as a separate task, not something already in place.)*

---

## 🐛 Bug Reports

```
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Environment**
- Browser: [e.g. Chrome]
```

---

## 💡 Feature Requests

```
**Feature description**
What you want to add and why it's useful.

**How it should work**
Describe the expected behavior.
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Vite Documentation](https://vitejs.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 💬 Questions?

Reach out to the team via WhatsApp/Discord, or open a GitHub Issue.

---

## ✅ Final Checklist Before Submitting a PR

- [ ] Code follows the style guidelines above
- [ ] `npm run build` and `npm run lint` both pass
- [ ] Feature manually tested end-to-end
- [ ] No leftover debug code
- [ ] TypeScript types are complete
- [ ] PR description explains what changed and why

---

**Thank you for contributing!** 🚀

**Team Delta - Africa Code Academy** 🇱🇸