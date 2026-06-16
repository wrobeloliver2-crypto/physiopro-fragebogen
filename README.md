# PhysioPro Fragebogen-Tool

Wiederverwendbares Fragebogen-System für PhysioPro Lübeck.
Eine Basis-Seite, beliebig viele Fragebögen, beliebig viele Mitarbeiter.

## Links bauen

    https://<site>.netlify.app/?typ=<TYP>&name=<NAME>

- `typ`  = Schlüssel aus `questionnaires.js` (z. B. `profil`, `feedback`)
- `name` = Name der Person, URL-kodiert (Leerzeichen = %20)

Beispiele:
    /?typ=profil&name=Nico%20Neumann
    /?typ=feedback&name=Anna

Ohne `typ` wird `profil` genutzt. Ohne `name` läuft der Fragebogen anonym.

## Neuen Fragebogen anlegen

Nur `questionnaires.js` bearbeiten – neuen Schlüssel mit Fragen ergänzen.
Die Seite selbst muss nicht angefasst werden.

## Antworten

Gehen per Microsoft Graph als E-Mail an MAIL_RECIPIENT, CC an MAIL_CC.
Betreff: "<Fragebogen>: <Name>".

## ENV-Variablen (Netlify)

Siehe `.env.example`. AZURE_CLIENT_ID und AZURE_CLIENT_SECRET stammen aus
der Azure App-Registrierung mit Graph-Berechtigung `Mail.Send` (Application).
