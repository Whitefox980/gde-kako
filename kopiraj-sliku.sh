#!/bin/bash

echo "Unesi PUTANJU do slike (npr. /storage/emulated/0/Download/slika.jpg):"
read source

echo "Unesi NOVO IME slike (npr. registracija.jpg):"
read filename

DEST="$HOME/apps/gde-kako/public/images/$filename"

mkdir -p "$(dirname "$DEST")" # osiguraj da postoji folder

cp "$source" "$DEST"

if [ -f "$DEST" ]; then
  echo "✅ Slika je uspešno kopirana u: $DEST"
else
  echo "❌ Nešto nije u redu. Slika nije pronađena na odredištu."
fi
