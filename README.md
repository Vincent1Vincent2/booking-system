# Booking System

## Användarflöde för Bokningssystem

1. **Registrering**

   - Användaren navigerar till sidan och klickar på "Register"-knappen i headern.
   - Användaren fyller i sitt e-postadress och väljer ett lösenord.
   - När registreringen går igenom, omdirigeras användaren till inloggningssidan (/login).

2. **Inloggning**

   - Användaren anger sina inloggningsuppgifter (e-post och lösenord) på inloggningssidan.
   - Användaren klickar på "Logga in" för att autentisera och komma åt sitt konto.

3. **Boka Rum**

   - Efter inloggning klickar användaren på "Book a Room".
   - Användaren väljer ett rum från en dropdown-meny.
   - Användaren väljer ett giltigt datum för bokningen.
   - Användaren bekräftar bokningen genom att klicka på "Boka".

4. **Visa Bokningar**

   - Användaren klickar på "My Bookings" för att se sina bokningar.
   - Sidan "My Bookings" visar två sektioner:
     - **Aktiva Bokningar**: Listar kommande bokningar med rum och datum.
     - **Tidigare Bokningar**: Listar tidigare bokningar som automatiskt arkiveras efter att bokningsdatumet har passerat.

5. **Hantera Bokningar**
   - Under "Aktiva Bokningar" kan användaren se varje bokning med två knappar:
     - **Redigera Bokning**: Tillåter användaren att ändra rummet och/eller datumet för bokningen.
     - **Ta Bort Bokning**: Tillåter användaren att ta bort bokningen.

## Projektbeskrivning

Detta projekt är ett bokningssystem skapat främst för att öva på Cypress och E2E-tester. Projektet består av två huvudmappar:

- **client**: Innehåller front-end-koden, skriven i vanilla TypeScript, samt alla Cypress-tester. -
- **server**: Innehåller back-end-API för bokningssystemet, skrivet i ren JavaScript med Express.

## Produktionsmiljö

För produktion behöver du också lägga till reCAPTCHA v2 nycklar:

Front-end .env fil

```env
RECAPTCHA_SITE_KEY=YOUR_RECAPTCHA_SITE_KEY
```

Back-end .env fil

```env
RECAPTCHA_SECRET_KEY=YOUR_RECAPTCHA_SECRET_KEY
```

https://www.google.com/recaptcha/admin/create

## Bygga, Köra och Testa Projektet

### Förkrav Innan du bygger och kör projektet, se till att du har följande verktyg installerade på din maskin:

- Node.js
- npm (Node Package Manager)
- Prisma CLI

### Installation Installera beroenden för både client och server:

```bash
cd client
npm install
cd ../server
npm install
```

### Bygga och Köra

#### Client

Bygg och kör klienten i utvecklingsläge:

```bash
cd client
npm run dev
```

Detta startar en webpack-server som servar den statiska HTML-filen.

För att bygga klienten för produktion:

```bash
npm run build
```

För att serva den byggda klienten med Node.js:

```bash
npm run serve
```

#### Server

Starta servern i utvecklingsläge:

```bash
cd server
npm run dev
```

Detta startar Express-servern.

### Testning

#### Cypress Tester

För att öppna Cypress GUI och köra tester:

```bash
cd client
npm run cypress:open
```

För att köra Cypress-tester i terminalen:

```bash
npm run cypress:run
```

#### Prisma

Generera Prisma-klient:

```bash
cd server
npm run generate
```

Utför databas-migreringar:

```bash
npm run migrate
```

Öppna Prisma Studio för att granska databasen:

```bash
npm run studio
```

Genom att följa ovanstående steg kan du bygga, köra och testa bokningssystemet effektivt. Lycka till!
