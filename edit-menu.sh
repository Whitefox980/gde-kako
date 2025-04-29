#!/bin/bash

HISTORY_FILE=".edit_history"

declare -A files=(
  [1]="agents/centralAgent.ts"
  [2]="agents/specialists/predragAgent.ts"
  [3]="agents/specialists/milicaAgent.ts"
  [4]="agents/specialists/jocaAgent.ts"
  [5]="agents/specialists/oliverAgent.ts"
  [6]="agents/specialists/anaAgent.ts"
  [7]="lib/openai.ts"
  [8]="components/QuestionInput.tsx"
  [9]="components/SuggestedQuestions.tsx"
  [10]="components/AnswerDisplay.tsx"
  [11]="pages/index.tsx"
  [12]="styles/themes.css"
)

function show_history() {
  if [ -f "$HISTORY_FILE" ]; then
    echo "=== Nedavno editovani fajlovi ==="
    cat "$HISTORY_FILE"
    echo ""
  fi
}

function add_to_history() {
  local selected="$1"
  grep -vxF "$selected" "$HISTORY_FILE" 2>/dev/null > "$HISTORY_FILE.tmp"
  echo "$selected" >> "$HISTORY_FILE.tmp"
  mv "$HISTORY_FILE.tmp" "$HISTORY_FILE"
}

while true; do
  clear
  echo "=== Gde-Kako PRO Edit Meni ==="
  show_history
  echo "1) Centralni agent (centralAgent.ts)"
  echo "2) Predrag agent (predragAgent.ts)"
  echo "3) Milica agent (milicaAgent.ts)"
  echo "4) Joca agent (jocaAgent.ts)"
  echo "5) Oliver agent (oliverAgent.ts)"
  echo "6) Ana agent (anaAgent.ts)"
  echo "7) OpenAI konektor (openai.ts)"
  echo "8) Komponenta - QuestionInput.tsx"
  echo "9) Komponenta - SuggestedQuestions.tsx"
  echo "10) Komponenta - AnswerDisplay.tsx"
  echo "11) Početna stranica (index.tsx)"
  echo "12) Tematski stilovi (themes.css)"
  echo "0) Izlaz"
  echo ""
  read -p "Izaberi broj fajla za editovanje: " choice

  if [ "$choice" == "0" ]; then
    echo "Izlazim..." && exit 0
  fi

  selected=${files[$choice]}
  
  if [ -n "$selected" ]; then
    nano "$selected"
    add_to_history "$selected"
  else
    echo "Pogrešan izbor, pokušaj ponovo."
    sleep 2
  fi
done
