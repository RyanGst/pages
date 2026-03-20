---
title: Mise como Gerenciador Diário de Versões
description: Um guia no meu novo site de docs com Starlight.
giscus: true
---

Mise, pronunciado “MEEZ ahn plahs”, é um gerenciador de versões de gerenciadores de versões. Virou uma peça estrutural do meu fluxo diário como software engineer.

![bro is cooking](../../../../assets/sanji-cooking.png)

O Mise consegue gerenciar versões entre plataformas, linguagens e projetos, de forma transparente. Sem shell hooks. Sem shims.

## Ergonomia

Vamos comparar `mise` com `nvm` (Node Version Manager):

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

O snippet acima vem direto da documentação do `nvm`: [https://github.com/nvm-sh/nvm/blob/e4e34ec7f9500709f938e7d0188107741ace70e2/README.md?plain=1#L741C7-L761C5](https://github.com/nvm-sh/nvm/blob/e4e34ec7f9500709f938e7d0188107741ace70e2/README.md?plain=1#L741C7-L761C5)

Isso deve ser colocado no seu `~/.zshrc`, então toda vez que você der `cd` para dentro de um projeto Node.js, ele vai instalar e setar a versão do projeto como a atual do seu shell.

Com `mise` (depois de ativado), essa tarefa vira só:

```bash
mise use node@latest
```

## Semântica

Pra saber qual versão de ferramenta usar, o mise procura um arquivo `mise.toml` no diretório atual e nos pais. A configuração global fica em `~/.config/mise/config.toml` e pode ser algo assim:

```toml
[tools]
bun = "latest"
node = "22"
usage = "latest"

[settings]
idiomatic_version_file_enable_tools = ["node"]
```

### Hierarquia de Configuração

Como visto na [docs](https://mise.jdx.dev/dev-tools/#configuration-hierarchy), o mise suporta configuração aninhada que faz cascade do mais amplo pro mais específico:

```
~/.config/mise/config.toml      # Defaults globais
~/work/mise.toml                # Ferramentas específicas do trabalho
~/work/project/mise.toml        # Overrides específicos do projeto
~/work/project/.tool-versions   # Compatibilidade legada com asdf
```

Cada nível pode sobrescrever ou estender o anterior, te dando controle fino das versões das ferramentas em diferentes contextos.

O mise pode ser usado como substituto direto do asdf. Ele suporta os mesmos arquivos `.tool-versions` que você talvez já use com asdf e consegue usar plugins do asdf via o [backend do asdf](https://mise.jdx.dev/dev-tools/backends/asdf.html).

Quem vem do `asdf` normalmente percebe o `mise` como um `asdf` mais rápido e mais simples.

## Ferramentas oficiais

O `mise` vem com alguns plugins embutidos na CLI, escritos em Rust.

Você pode ver os plugins core com `mise registry -b core`.

| Ferramenta | Comando de instalação       |
| ---------- | --------------------------- |
| Bun        | `mise use -g bun@latest`    |
| Elixir     | `mise use -g erlang elixir` |
| Java       | `mise use -g java@temurin`  |
| Swift      | `mise use -g swift`         |
| Node       | `mise use -g node@20`       |
| Zig        | `mise use -g zig@latest`    |

## Considerações finais

Ferramentas como o `mise` deixam o desenvolvimento mais acessível. É um _must have_ em qualquer setup moderno e uma ótima opção pra acelerar on-boardings!

👉 [Conecte-se comigo no LinkedIn](https://www.linkedin.com/in/ryangst/)
