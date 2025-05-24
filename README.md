# Angular 19 Starter  

Projet Frontend Angular 19 moderne avec Tailwind CSS 4.1, DaisyUI 5.x, ngx-translate, Chart.js et support complet UI/UX standalone avec SRP.

## 🔧 Stack Technique

- Angular 19 Standalone API
- Tailwind CSS v4.1
- DaisyUI v5.x (thème personnalisable via `data-theme`)
- ngx-translate (multi-fichier dynamique)
- Chart.js & ng2-charts
- Signal / Computed / SRP

## 📦 Installation

```bash
git clone https://github.com/coundia/angular-i18n-daisyui-starter
cd angular-i18n-daisyui-starter
npm install
```

## 🚀 Démarrage

```bash
npm start
```

Accessible via `http://localhost:4200`

## 🛠️ Commandes Utiles

| Commande        | Description                        |
|-----------------|------------------------------------|
| `npm start`     | Lancer l'application               |
| `npm run build` | Compiler pour la prod              |
| `npm run test`  | Lancer les tests unitaires         |
| `npm run watch` | Rebuild à chaque modification      |

## 🌍 Traduction

Support multi-langue avec `@ngx-translate/core` + `MultiTranslateHttpLoader`.

### Ajout de fichiers de traduction :
```ts
export function httpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    'general',
    'nav',
    'notification',
    'security',
    'errors',
    // ajouter ici vos fichiers
  ]);
}
```

## 🎨 Thème & Design

Utilise `DaisyUI` avec thème dynamique :

```html
<html data-theme="light">
<!-- ou -->
<html data-theme="dark">
<!-- ou votre thème -->
<html data-theme="tenant-theme">
```

## 📊 Graphiques

Intégration via `ng2-charts` et `chart.js` :

```ts
import { NgChartsModule } from 'ng2-charts';
```

## 🧪 Tests

Basé sur Karma + Jasmine :

```bash
npm run test
```

## 🧩 À venir
 
- Animations et accessibilité optimisées

---

Développé avec ❤️  
