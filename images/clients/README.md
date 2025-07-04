# Logos des Clients - Guide de Remplacement

Ce dossier contient les logos des clients de Nexa Partners. Actuellement, des placeholders SVG sont utilisés en attendant les vrais logos.

## 📁 Structure des Fichiers

```
images/clients/
├── roland-berger.svg      # Roland Berger
├── bcg.svg               # BCG
├── nuitee.svg            # Nuitée
├── safarclick.svg        # Safarclick
├── info-ma.svg           # Info.ma
├── glovo.svg             # Glovo
├── julhiet-sterwen.svg   # Julhiet Sterwen
├── coface.svg            # COFACE
├── arthur-d-little.svg   # Arthur D. Little
├── gsb.svg               # GSB
└── README.md             # Ce fichier
```

## 🔄 Comment Remplacer les Logos

### 1. Préparation des Images
- **Format recommandé** : SVG (vectoriel) ou PNG avec fond transparent
- **Taille recommandée** : 200x80 pixels minimum
- **Résolution** : 72 DPI pour le web
- **Couleur** : Noir ou couleur de marque (sera converti en grayscale automatiquement)

### 2. Remplacement des Fichiers
1. Renommez votre fichier logo selon la convention ci-dessus
2. Remplacez le fichier SVG correspondant dans ce dossier
3. Assurez-vous que le nom du fichier correspond exactement à celui référencé dans le HTML

### 3. Formats Supportés
- **SVG** (recommandé) : Vectoriel, redimensionnable sans perte de qualité
- **PNG** : Avec fond transparent
- **JPG** : Si pas d'alternative (éviter si possible)

### 4. Optimisation des Images
Pour de meilleures performances :
- Compressez les images PNG/JPG
- Optimisez les SVG avec des outils comme SVGO
- Gardez les fichiers sous 50KB si possible

## 🎨 Styles CSS Appliqués

Les logos sont automatiquement stylisés avec :
- **Grayscale par défaut** : Les logos apparaissent en noir et blanc
- **Couleur au survol** : Les logos reprennent leurs couleurs originales au survol
- **Taille responsive** : Les logos s'adaptent à la taille du conteneur
- **Animation fluide** : Transitions douces pour les effets de survol

## 📱 Responsive Design

Les logos s'adaptent automatiquement :
- **Desktop** : Affichage en grille 4-5 colonnes
- **Tablet** : Affichage en grille 3-4 colonnes
- **Mobile** : Affichage en grille 2 colonnes
- **Très petit mobile** : Affichage en 1 colonne

## 🔧 Personnalisation

### Changer les Couleurs
Modifiez dans `styles.css` :
```css
.client-logo img {
    filter: grayscale(100%); /* Noir et blanc par défaut */
}

.client-logo:hover img {
    filter: grayscale(0%); /* Couleurs originales au survol */
}
```

### Changer la Taille
Modifiez dans `styles.css` :
```css
.client-logo img {
    max-height: 60px; /* Hauteur maximale */
}
```

## 📋 Checklist de Remplacement

- [ ] Logo au format SVG ou PNG avec fond transparent
- [ ] Taille minimale 200x80 pixels
- [ ] Nom de fichier correct selon la convention
- [ ] Image optimisée (compression)
- [ ] Test sur différents écrans
- [ ] Vérification du responsive design

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez que le nom du fichier correspond exactement
2. Assurez-vous que le format est supporté
3. Testez avec un navigateur moderne
4. Vérifiez la console pour les erreurs de chargement

---

**Note** : Les placeholders actuels sont temporaires et seront remplacés par les vrais logos des clients. 