# E-dnevnik na Blockchainu

## Opis Projekta

Ovaj projekt implementira e-dnevnik na Ethereum blockchainu kako bi se pratili podaci o ocjenama učenika, radu profesora i drugim relevantnim informacijama u školama.

## Smart Contract - BlockGrade.sol

### Strukture

- **Ucenik:** Sadrži informacije o učenicima, uključujući ID, odjel i mapiranje ocjena.
  
- **Profesor:** Pohranjuje informacije o profesorima, uključujući ID, ime, adresu i mapiranje predmeta koje predaju.

- **Skola:** Sadrži informacije o školama, uključujući ID, direktora i mapiranje profesora u toj školi.

- **Predmet:** Pohranjuje informacije o predmetima, uključujući ID i naziv.

### Funkcionalnosti

1. **Dodavanje Škole i Direktora:**
   - Superadmin može dodavati nove škole i postavljati direktora.

2. **Dodavanje Profesora:**
   - Direktor škole može dodavati profesore u svoju školu, povezujući ih s određenim predmetima.

3. **Dodavanje Učenika:**
   - Direktor škole može dodavati učenike u svoju školu.

4. **Postavljanje Ocjena:**
   - Profesor može postavljati ocjene učenicima za svoje predmete.

5. **Promjena Vlasnika:**
   - Superadmin može promijeniti vlasnika ugovora.

### Modifikatori

- `samoOwner`: Ograničava pristup funkcijama samo na vlasnika ugovora.
  
- `samoOwnerSkole`: Ograničava pristup funkcijama samo na direktora određene škole.

- `samoPredmetniNastavnik`: Ograničava postavljanje ocjena samo za predmete koje profesor predaje.

## Web Aplikacija

### Tehnologije

- **Frontend:** React.js
- **Blockchain Integracija:** Web3.js | Ethers.js

### Funkcionalnosti

1. **Prikaz Podataka:**
   - Prikaz ocjena, informacija o učenicima, profesorima i školama.

2. **Interakcija s Pametnim Ugovorom:**
   - Pozivanje funkcija pametnog ugovora za dodavanje novih podataka.

3. **Korisnička Autentikacija:**
   - Sigurna prijava i registracija korisnika.

## Instalacija i Pokretanje

1. **Blockchain Smart Contract:**
   - Kopirajte `BlockGrade.sol` u svoj Ethereum development okoliš.
   - Kompajlirajte i deployajte pametni ugovor.

2. **Web Aplikacija:**
   - Kloneajte ovaj repozitorij.
   - Pokrenite frontend: `cd frontend && npm install && npm start`.

## Autor
- Toni Dumančić @toni-d-e-v
- Roko Vidović