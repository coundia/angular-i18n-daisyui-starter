#!/.bin/bash
#Prérequis: ImageMagick doit être installé (brew install imagemagick sur Mac).
echo "Génération des icônes à partir de logo.png..."
mkdir -p src/assets/icons

convert src/assets/logo.png -resize 512x512 src/assets/icons/icon-512x512.png
convert src/assets/logo.png -resize 192x192 src/assets/icons/icon-192x192.png
convert src/assets/logo.png -resize 180x180 src/assets/icons/apple-touch-icon.png
convert src/assets/logo.png -resize 32x32 src/assets/icons/favicon-32x32.png
convert src/assets/logo.png -resize 16x16 src/assets/icons/favicon-16x16.png
convert src/assets/logo.png -resize 48x48 src/favicon.ico

echo "Tous les icônes sont générés dans src/assets/icons/ et favicon.ico à la racine."
