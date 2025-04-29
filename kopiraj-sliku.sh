#!/bin/bash

echo "Unesi PUTANJU do slike na telefonu (npr. /storage/emulated/0/Download/slika.jpg):"
read source

echo "Unesi NOVO IME slike (npr. registracija.jpg):"
read filename

dest=~/apps/gde-kako/public/images/$filename

cp "$source" "$dest"

echo "Slika je uspešno kopirana kao $filename u public/images folder!"
