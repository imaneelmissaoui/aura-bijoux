# Aura — Rose nacré & lilas

Version du 7 octobre 2026. Boutique bilingue français/anglais, adaptée au téléphone et à l’ordinateur.

## Mettre cette version sur ton GitHub et ton Render existants

1. Décompresse `Aura_Feminine_GitHub.zip` sur ton ordinateur.
2. Ouvre ton dépôt GitHub `aura-bijoux`, puis **Add file → Upload files**.
3. Glisse **le contenu du dossier décompressé**, avec `index.html`, `assets`, `images`, `fonts`, `favicon.svg` et `render.yaml`, à la racine du dépôt. Ne téléverse pas seulement le ZIP et ne crée pas un dossier supplémentaire autour du site.
4. Confirme avec **Commit changes**. GitHub doit afficher `index.html` et les trois dossiers à la racine. Le nouvel `index.html` remplace l’ancien. Les anciens `app.js` et `styles.css` ne sont plus utilisés.
5. Sur ton service Render existant, conserve **Build Command** : `echo "Static site"` et **Publish Directory** : `.`. Si le déploiement automatique est activé, il démarre après le commit. Sinon, lance **Manual Deploy → Deploy latest commit**.
6. Une fois le déploiement terminé, recharge ton site avec Ctrl+Shift+R (ou Cmd+Shift+R sur Mac).

Les photos et les polices sont incluses. Il n’y a rien à télécharger depuis Vinted pour que le site s’affiche. Aucune compilation n’est nécessaire pour cette mise en ligne : les fichiers prêts à servir sont à la racine.

Si ton service existant est un Web Service et non un Static Site, utilise un Static Site avec les paramètres ci-dessus. Ne remplace pas un service différent sans vérifier son type.

## Ce que contient cette version

- Logo de l’aperçu conservé : monogramme A entouré d’un halo elliptique et mot AURA.
- Ivoire perlé, rose nacré, lilas, touches champagne et prune pour la lisibilité.
- Huit créations, huit photos harmonisées et huit photos originales.
- Carrousel, catégories, recherche, tri des prix, favoris et panier de sélection.
- Fiches bijoux, détails et bouton pour consulter la photo originale.
- Français / anglais ; choix et favoris enregistrés dans le navigateur.
- Animations discrètes, adaptées au réglage « réduire les animations ».

## Achats et catalogue

Les boutons d’achat ouvrent les annonces Vinted correspondantes. Aucun paiement, numéro de carte ni compte client n’est géré par Aura. Le panier mémorise une sélection ; il ne réserve pas les bijoux et ne se transfère pas automatiquement sur Vinted.

Prix et annonces repris de la collection importée le 5 octobre 2026. Ils ne sont pas synchronisés : vérifie les liens, les prix et les pièces encore disponibles avant diffusion. Le site rappelle aux acheteuses que les frais et la disponibilité sont confirmés sur Vinted.

Les photos harmonisées sont retouchées. Le bouton « Voir la photo originale » permet d’inspecter les vrais détails du bijou. Les originaux restent disponibles dans `images/original-*.webp`.

## Modifier le site plus tard

Le dossier `source` contient le projet React / Vite complet et son fichier de dépendances verrouillées. Le site prêt à publier est déjà présent à la racine.

Avec Node.js 22.12+ ou 24 installé :

```sh
cd source
npm ci
npm run dev
```

Fichiers utiles :
- `src/lib/catalog.ts` : prix, descriptions, catégories et liens Vinted ;
- `src/App.tsx` : textes et interactions français/anglais ;
- `src/styles.css` : style et palette ;
- `public/images` : photos.

Après une modification :

```sh
npm run typecheck
npm run build
```

Copie ensuite **le contenu de `source/dist`** à la racine de ton dépôt, en remplaçant `index.html`, `assets`, `images`, `fonts` et `favicon.svg`. Conserve `render.yaml`. Puis commit pour relancer Render.

Pour un aperçu local des fichiers prêts à servir, lance `python3 -m http.server 8080` à la racine et ouvre `http://localhost:8080`. Ne double-clique pas simplement sur `index.html` : le site utilise des modules JavaScript servis via HTTP.

## Notes techniques

Aucun secret, clé API, serveur de paiement ou suivi publicitaire n’est inclus. Polices locales : Inter et Cormorant Garamond, licences OFL dans `fonts`. Le fichier `render.yaml` propose des en-têtes de sécurité pour un déploiement Blueprint. Sur un Static Site existant créé sans Blueprint, ces en-têtes doivent être configurés dans le tableau de bord Render si tu souhaites les activer ; téléverser le YAML seul ne modifie pas ces réglages.

Vérifications réalisées : compilation de production, TypeScript, chargement des images, carrousel, FR/EN, filtres, recherche, tri, favoris, photos originales, ajout/retrait du panier et menu mobile à 390 px. Aucun achat réel n’a été effectué.

## English quick guide

Unzip, upload the **contents** to the root of your GitHub repository, and commit. Keep Render as a Static Site with build command `echo "Static site"` and publish directory `.`. Deploy the latest commit. The root files are already built; all photos and fonts are included. The editable React/Vite project is in `source`. Purchases are completed on Vinted; this site does not process payments or synchronize stock.
