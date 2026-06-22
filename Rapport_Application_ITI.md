# Rapport de l'Application Web - Institut ITI Tanger

## 1. Introduction

L'application **Institut ITI (Institut Trans Informatique)** est une plateforme web moderne destinée à la gestion des formations professionnelles et des inscriptions pour l'institut ITI situé à Tanger, Maroc. Fondé en 1986, cet institut propose des formations en informatique, logistique et gestion.

L'application est développée avec **React 19 + Vite** et fonctionne entièrement en mode static (sans backend), utilisant le stockage local du navigateur pour simuler les fonctionnalités d'administration.

---

## 2. Architecture Technique

### Stack Technologique

| Technologie | Version | Usage |
|-------------|---------|-------|
| React | 19.2.5 | Framework UI principal |
| Vite | 8.0.10 | Build tool et dev server |
| React Router | 7.14.2 | Navigation et routage |
| Framer Motion | 12.38.0 | Animations et transitions |
| Tailwind CSS | 3.4.19 | Stylisation CSS |
| Lucide React | 1.8.0 | Icônes |
| Recharts | 3.8.1 | Graphiques analytics |

### Structure du Projet

```
src/
├── animations/         # Variantes d'animation Framer Motion
├── components/         # Composants réutilisables
│   ├── admin/         # Composants panel admin (Sidebar, Topbar, Modal, Toast, StatsCard)
│   └── *.jsx          # Composants globaux (Navbar, Footer, etc.)
├── data/              # Données statiques (formations.json)
├── features/          # Fonctionnalités par domaine
├── hooks/             # Hooks personnalisés (useTheme, useSEO)
├── pages/             # Pages principales de l'application
├── services/          # Services API (mock/localStorage)
├── App.jsx            # Composant racine avec routage
└── main.jsx           # Point d'entrée
```

---

## 3. Fonctionnalités Principales

### 3.1 Pages Publiques

| Page | Route | Description |
|------|-------|-------------|
| **Accueil** | `/` | Page d'accueil avec hero, à propos, formations, FAQ |
| **Formations** | `/formations` | Liste des formations disponibles |
| **Détail Formation** | `/formations/:id` | Informations détaillées d'une formation |
| **Contact** | `/contact` | Formulaire de contact et informations |
| **Inscription** | `/inscription` | Formulaire de candidature en ligne |

### 3.2 Pages Administratives (protégées)

| Page | Route | Description |
|------|-------|-------------|
| **Login** | `/login` | Authentification admin |
| **Admin Formations** | `/admin/formations` | Gestion CRUD des formations |
| **Admin Analytics** | `/admin/analytics` | Tableau de bord avec statistiques |

### 3.3 Authentification

- **Credentials par défaut** : `admin@iti.ma` / `admin123`
- Stockage du token et utilisateur dans `localStorage`
- Protection des routes `/admin/*` via `ProtectedRoute`

---

## 4. Services et Gestion des Données

### 4.1 Services API (Mock/Static)

L'application utilise des services simulés qui interagissent avec `localStorage` :

```javascript
// Services disponibles
authService         # Login, logout, vérification auth
formationService    # Liste et détail des formations
categoryService     # Catégories (Diplôme, Formations continues, Pratiques)
inscriptionService  # Création de candidatures
contactService      # Envoi de messages (logconsole)
adminService        # CRUD formations, inscriptions, stats, export CSV
```

### 4.2 Stockage Local

| Clé localStorage | Description |
|------------------|-------------|
| `admin_token` | Jeton d'authentification |
| `admin_user` | Données utilisateur connecté |
| `iti_static_formations` | Formations (CRUD) |
| `iti_static_inscriptions` | Candidatures soumises |

### 4.3 Données Initiales

L'application charge des formations depuis `src/data/formations.json` et génère des inscriptions de démonstration.

---

## 5. Design et UX

### 5.1 Design System

- **Palette de couleurs** : Primary, Secondary, Tertiary avec variantes
- **Typographie** : Material Symbols + polices système
- **Animations** : Framer Motion (fadeUp, imageReveal, staggerContainer, pageLoad)

### 5.2 Composants Clés

| Composant | Fonctionnalité |
|-----------|----------------|
| `Navbar` | Navigation principale sticky |
| `Footer` | Pied de page avec liens |
| `CursorAura` | Effet visuel curseur |
| `ScrollProgressBar` | Barre de progression scroll |
| `MagneticHover` | Effet hover magnétique sur boutons |
| `AnimatedCounter` | Compteur animé (38+ ans d'expérience) |
| `ThemeToggle` | Basculement thème clair/sombre |
| `ProtectedRoute` | Garde pour routes admin |
| `FormationCard` | Carte formation réutilisable |

### 5.3 Animations

- **Page transitions** : Variants d'animation au chargement
- **Scroll animations** : Éléments apparaissent au scroll (viewport)
- **Hover effects** : Scale, translate sur hover
- **Image reveal** : Effet de révélation d'image

---

## 6. SEO et Accessibilité

### Hooks Personnalisés

| Hook | Usage |
|------|-------|
| `useSEO` | Meta tags, title, description, canonical |
| `useTheme` | Gestion thème clair/sombre |

---

## 7. Fonctionnalités Admin

### 7.1 Gestion des Formations

- Liste des formations avec tri et recherche
- Création de formation (titre, description, durée, catégorie, image)
- Modification de formation existante
- Suppression de formation
- Catégories : Diplôme, Formations continues, Formations pratiques

### 7.2 Analytics

- Statistiques globales (total inscriptions, inscriptions aujourd'hui)
- Graphique des inscriptions par formation
- Graphique temporel (14 derniers jours)
- Export CSV des inscriptions

### 7.3 Interface Admin

- **Sidebar** : Navigation admin
- **Topbar** : Titre page, actions
- **Modal** : Confirmation actions, édition
- **Toast** : Notifications (success/error)
- **StatsCard** : Métriques clés

---

## 8. Déploiement

### 8.1 Build

```bash
npm run build    # Production build
npm run preview  # Preview production build
```

### 8.2 Hébergement Supporté

| Plateforme | Configuration |
|------------|---------------|
| **Vercel** | `vercel.json` avec rewrite SPA |
| **Netlify** | `public/_redirects` pour fallback |
| **GitHub Pages** | Utilise `HashRouter` |

---

## 9. Routes de l'Application

```
/                           → Home
/formations                 → Liste formations
/formations/:id             → Détail formation
/contact                    → Page contact
/inscription                → Formulaire inscription
/login                      → Connexion admin

/admin                      → Redirect /admin/formations
/admin/formations           → Gestion formations
/admin/analytics            → Tableau de bord stats
```

---

## 10. Conclusion

L'application ITI est une plateforme complète de gestion de formations professionnels avec :

- **Frontend moderne** React + Vite + Tailwind
- **UX riche** avec animations Framer Motion
- **Mode static** sans backend (localStorage)
- **Panel admin** complet pour gestion des formations et inscriptions
- **SEO optimisé** avec hooks personnalisés
- **Responsive design** adapté à tous les écrans

L'application est prête pour le déploiement sur les principales plateformes d'hébergement static.

---

*Rapport généré le 22 juin 2026*