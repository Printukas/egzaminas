# Egzaminas. Įrangos rezervacijos ir administravimo sistema. 
Sistemos teikiama paslauga yra galimybė užsirezervuoti automobilius nuomai. Čia nuoma ir rezervacija suprantama kaip panašus dalykas,
vartotojas išsinuomoja tam tikrą automobilį tam tikrą laiką.

<img width="1905" height="783" alt="image" src="https://github.com/user-attachments/assets/21e532dd-c929-4953-aa5f-6670203338d1" />


## Naudojamos technologijos
- **Frontend:** React;
- **Backend:** Node.js;
- **Duomenų bazė:** MongoDB
- **Programavimo kalbos:** HTML, CSS, JavaScript;
- **Kiti įrankiai:** Git, Trello, Jest unit testam;
- **Deployment:** frontend - Vercel, backend - Render;
    - https://egzaminas-jddr-a6a68py71-linas-projects-34f26cb2.vercel.app/
      
## Rezervacijoms taikomi ribojimai:
- Automobilis negali būti rezervuotas du kartus tam pačiam laikui;
- Vienas vartotojas gali išsinuomoti daug skirtingų automobilių, jei automobilis užrezervuotas, kitam vartotojui neišeis jo užrezervuoti;
- Negalima rezervuoti į praeitį;
- Maksimalus nuomos laikas yra 6 mėn (negalima peržengti šios ribos);
- Minimalus nuomos laikas 2 valandos;
- Maksimalus rezervacijos laikos į priekį yra 1 mėnesis;
- Visi veiksmai galimi tik prisijungus prie sistemos.
  
<img width="1691" height="760" alt="image" src="https://github.com/user-attachments/assets/8a507fe7-5a1b-4f3a-a40a-cdfe12ded03d" />

## Funkciniai reikalavimai
**Registracija ir prisijungimas:**
- Sistema leidžia vartotojui užsiregistruoti (su vardu, el. paštu, slaptažodžiu);
- Sistema leidžia vartotojui prisijungti su registruotais duomenimis;
- Sistema tikrina slaptažodžio teisingumą ir autentifikaciją per JWT;
  
**Vartotojo rolės:**
- Įgyvendinamos dvi rolės - administratorius ir paprastas vartotojas;
- **Administratorius** į sistemą gali:
     - įkelti,
     - redaguoti,
     - ištrinti automobilius,
     - mato visas rezervacijas ir užsirezervavusiųjų asmenų vardus bei paštą.
     - gali keisti būsenas (patvirtinta, atmesta, vykdoma, laukianti),
     - įkeltus automobilius gali paslėpti nuo paprastų vartotojų (paskelbta - vartotojai mato mašinas/juodraštis - matoma tik admin.)
- **Vartotojai**:
     - matyti paskelbtus automobilius,
     - juos užsirezervuoti,
     - atšaukti,
     - peržiūrėti,
     - redaguoti rezervacijas.


## Nefunkciniai reikalavimai
- Vartotojų autentifikacija;
- Sistema paprasta ir aiški vartotojui be papildomų mokymų;
- Sistema neleidžia sukurti dviejų persidengiančių rezervacijų tam pačiam automobiliui;
- Tik administratorius turi prieigą prie valdymo ir visų rezervacijų;
- Slaptažodžiai saugomi bcrypt hash forma;
- Operacijos atliekamos realiu laiku;
- Dizainas prisitaiko prie ekrano rezoliucijos
- Pagrindinis funkcionalumas ištestuotas unit testais/dar yra testuojama

## Projekto paleidimas lokaliai
1. Nuklonuokite repozitoriją:
   ```bash
   git clone git@github.com:Printukas/egzaminas.git
   cd egzaminas
2. Įdiekite npm backend'ui ir frontend'ui:
   ```bash
   npm install
   // frontend
   cd client
   npm install
3. Per du terminalus paleiskite:
   ```bash
   npm run dev
   npm start
   // jeigu ateina pranešimas, kad portas užimtas, paspauskite "yes", kad persijungtų į kitą


