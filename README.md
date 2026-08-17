# Connect & Grow

https://elite-prize-site-4iaqydhb.blinkusercontent.com/



Je veux améliorer mon site en conservant son design actuel et en rendant le système de contact réellement fonctionnel.

1. Formulaire de contact

Quand un visiteur remplit le formulaire et clique sur « Envoyer le message » :

- enregistrer la demande dans la base de données ;
- envoyer une notification à justebyrne@gmail.com ;
- afficher : « Votre message a bien été envoyé. Nous vous répondrons prochainement. » ;
- afficher une erreur claire si l'envoi échoue.

2. Contact WhatsApp

Ajouter un bouton visible :
« Nous contacter sur WhatsApp »

Le bouton doit ouvrir une conversation WhatsApp avec :
+18258771057

3. Contact Telegram

Ajouter un bouton visible :
« Nous contacter sur Telegram »

Le bouton doit ouvrir :
https://t.me/Justeayero33

4. Tableau de bord administrateur

Créer une section « Messages reçus » permettant de consulter les demandes envoyées depuis le formulaire.

Pour chaque demande, afficher :

- prénom ;
- nom ;
- adresse e-mail ;
- objet ;
- message ;
- date et heure de réception.

Ajouter la possibilité de supprimer une demande.

5. Notifications

Faire en sorte que chaque nouveau formulaire déclenche réellement une notification par e-mail vers :
justebyrne@gmail.com

Ne crée pas simplement une interface visuelle : configure réellement le système d'enregistrement et de notification.

6. Sécurité

Ne jamais demander ni enregistrer :

- mot de passe ;
- numéro de carte bancaire ;
- CVV ;
- code PIN ;
- code SMS/OTP ;
- identifiants bancaires.

Ajouter une petite mention indiquant aux visiteurs de ne jamais transmettre ces informations par le formulaire, WhatsApp ou Telegram.

7. Vérification finale

Après les modifications :

- tester le formulaire ;
- vérifier l'enregistrement dans la base de données ;
- vérifier l'envoi de notification e-mail ;
- vérifier les boutons WhatsApp et Telegram ;
- vérifier que tout fonctionne correctement sur téléphone Android et ordinateur

Améliorer les titres en caractères, les couleurs un peu plus claire et bien jolis , les images et le contenu existant du site autant que possible. Ne supprime aucune fonctionnalité existante sans raison.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f77cd351-dd0f-476d-89bc-2f8a4f59d778).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
