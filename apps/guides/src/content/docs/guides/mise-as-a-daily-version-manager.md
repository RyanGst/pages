---
title: Mise as a Daily Version Manager
description: Mise is a next-gen version manager and task runner
giscus: true
---

Mise, pronounced "MEEZ ahn plahs", it's a version manager of version managers. It became a structural part of my daily workflows as a software engineer.

![bro is cooking](../../../assets/sanji-cooking.png)

Mise is capable of managing version across platforms, languages and projects, seamlessly. No shell hooks. No shims.

## Ergonomics

Let's compare `mise` with `nvm` (Node Version Manager):

```zsh
autoload -U add-zsh-hook

load-nvmrc() {
  local nvmrc_path
  nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version
    nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$(nvm version)" ]; then
      nvm use
    fi
  elif [ -n "$(PWD=$OLDPWD nvm_find_nvmrc)" ] && [ "$(nvm version)" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}

add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

The above snippet comes directly from `nvm` documentation: <https://github.com/nvm-sh/nvm/blob/e4e34ec7f9500709f938e7d0188107741ace70e2/README.md?plain=1#L741C7-L761C5>

this should be put in your `~/.zshrc`, so every time you `cd` into an nodejs project, it will install and set it's version as the current one for your shell.

With `mise` (after activation), the above task is as simple as:

```bash
mise use node@latest
```

## Semantic

To know which tool version to use, mise will look for a `mise.toml` file in the current directory and its parents. Global configuration it's stored at `~/.config/mise/config.toml` and can look like this:

```toml
[tools]
bun = "latest"
node = "22"
usage = "latest"

[settings]
idiomatic_version_file_enable_tools = ["node"]
```

### Configuration Hierarchy

An seen in their [docs](https://mise.jdx.dev/dev-tools/#configuration-hierarchy), mise supports nested configuration that cascades from broad to specific settings:

```
~/.config/mise/config.toml      # Global defaults
~/work/mise.toml                # Work-specific tools
~/work/project/mise.toml        # Project-specific overrides
~/work/project/.tool-versions   # Legacy asdf compatibility
```

Each level can override or extend the previous ones, giving you fine-grained control over tool versions across different contexts.

mise can be used as a drop-in replacement for asdf. It supports the same `.tool-versions` files that you may have used with asdf and can use asdf plugins through the [asdf backend](https://mise.jdx.dev/dev-tools/backends/asdf.html).

Users coming from `asdf` have generally found `mise` to just be a faster and simples `asdf`

## Official tools

`mise` comes with some plugins built into the CLI written in Rust.

You can see the core plugins with `mise registry -b core`.

| Tool   | Install command             |
| ------ | --------------------------- |
| Bun    | `mise use -g bun@latest`    |
| Elixir | `mise use -g erlang elixir` |
| Java   | `mise use -g java@temurin`  |
| Swift  | `mise use -g swift`         |
| Node   | `mise use -g node@20`       |
| Zig    | `mise use -g zig@latest`    |

## Final Thoughts

Tools like `mise` make development more approachable. It's a must have for any modern development setup and a great option to make on-boardings faster!.

👉 [Connect with me on LinkedIn](https://www.linkedin.com/in/ryangst/)

