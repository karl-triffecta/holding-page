Triffecta Static Holding Page

## Dev Setup

```bash
# brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
brew doctor
brew install nvm

# Follow prompts, e.g. mkdir, setup shell profile
source ~/.zshrc

# nvm install
nvm install

# pnpm
npm install
npm run postinstall
```

### Run locally

```bash
npm start
```

### Build site

```bash
npm run build
```
